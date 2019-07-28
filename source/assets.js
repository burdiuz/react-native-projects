import RNFS from 'react-native-fs';
import { Directory } from '@actualwave/react-native-files';

import { createInfoItem } from './info';

import {
  FILE_TYPE,
  PROJECT_ASSETS_FOLDER,
  CONTAINER_ASSETS_FOLDER,
  TEMPLATES_ASSETS_FOLDER,
  SNIPPETS_ASSETS_FOLDER,
  MODULES_ASSETS_FOLDER,
  TOOLS_ASSETS_FOLDER,
} from './constants';

import {
  getRootPath,
  getProjectsPath,
  getContainersPath,
  getTemplatesPath,
  getSnippetsPath,
  getModulesPath,
  getToolsPath,
} from './path';

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
      const proceed = file.isFile() && (overwrite || !(await target.has(name)));

      if (proceed) {
        await RNFS.copyFileAssets(`${sourceDirName}/${name}`, target.getChildPath(name));

        if (assetHandler) {
          await assetHandler(target, name);
        }
      } else {
        console.warn(
          `Asset ${name} cannot be copied.`,
          file.isFile(),
          overwrite,
          !(await target.has(name)),
        );
      }
    }
  } catch (error) {
    console.log('Assets copying error:', error);
  }
};

export const lockFileByName = async (parent, name) => {
  const file = await parent.getChildIfExist(name);

  if (file.isFile()) {
    const info = await createInfoItem(file, null, FILE_TYPE);

    info.locked = true;

    await info.flushSettings();
  }
};

const makeCopyAssetsFn = (sourceAssetsDir, getPath, defaultHandler = null) => async (
  overwrite = false,
  assetHandler = defaultHandler,
  targetDirectoryCached = null,
) => {
  let directory = targetDirectoryCached;

  if (!directory) {
    const path = await getPath();

    directory = await Directory.get(path);
  }

  await copyAssets(sourceAssetsDir, directory, overwrite, assetHandler);

  return directory;
};

export const copyProjectsAssets = makeCopyAssetsFn(PROJECT_ASSETS_FOLDER, getProjectsPath);

export const copyContainersAssets = makeCopyAssetsFn(CONTAINER_ASSETS_FOLDER, getContainersPath);

export const copyTemplatesAssets = makeCopyAssetsFn(TEMPLATES_ASSETS_FOLDER, getTemplatesPath);

export const copySnippetsAssets = makeCopyAssetsFn(SNIPPETS_ASSETS_FOLDER, getSnippetsPath);

export const copyModulesAssets = makeCopyAssetsFn(
  MODULES_ASSETS_FOLDER,
  getModulesPath,
  lockFileByName,
);

export const copyToolsAssets = makeCopyAssetsFn(TOOLS_ASSETS_FOLDER, getToolsPath);
