import RNFS from 'react-native-fs';
import { Directory } from '@actualwave/react-native-files';

import { createInfoItem } from './info';

import { FILE_TYPE } from './constants';

export const copyAssets = async (sourceDirName, target, overwrite = false, assetHandler = null) => {
  try {
    if (!target.exists()) {
      await target.create();
    }

    const files = await RNFS.readDirAssets(sourceDirName);
    const { length } = files;

    for (let index = 0; index < length; index++) {
      const file = files[index];
      const { name } = file;

      const exists = await target.has(name);
      const proceed = (file.isFile() && (overwrite || !exists)) || file.isDirectory();

      if (proceed) {
        if (file.isFile()) {
          await RNFS.copyFileAssets(`${sourceDirName}/${name}`, target.getChildPath(name));

          if (assetHandler) {
            await assetHandler(target, name);
          }
        } else {
          let childTarget;

          if (exists) {
            childTarget = await target.getDirectory(name);
          } else {
            childTarget = await target.createDirectory(name);
          }

          await copyAssets(`${sourceDirName}/${name}`, childTarget, overwrite, assetHandler);
        }
      } else {
        console.warn(`Asset ${name} cannot be copied.`, file.isFile(), overwrite, !(await target.has(name)));
      }
    }
  } catch (error) {
    console.log('Assets copying error:', error);
  }
};

export const lockFileByName = async (parent, name, cacheStorage = null) => {
  const file = await parent.getChildIfExist(name);

  if (file.isFile()) {
    const info = await createInfoItem(file, null, FILE_TYPE, cacheStorage);

    info.locked = true;

    await info.flushSettings();
  }
};

const makeCopyAssetsFn = (sourceAssetsDir, getPath, defaultHandler = null) => async (
  overwrite = false,
  assetHandler = defaultHandler,
  cacheStorage = null,
) => {
  const path = await getPath();
  const directoryInfo = cacheStorage.get(path);
  let directory = directoryInfo ? directoryInfo.fs : null;

  if (!directory) {
    directory = await Directory.get(path);
  }

  await copyAssets(sourceAssetsDir, directory, overwrite, assetHandler);

  return directory;
};
