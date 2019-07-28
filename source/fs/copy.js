import { FILE_TYPE } from '../constants';
import { getItemType, getInfoSettingsPath } from '../utils';
import { getInfoSettingsFile } from './settings';

export const copyFileRaw = async (source, targetPath, type = '') => {
  if (!type) {
    type = await getItemType(source);
  }

  const target = await source.copyTo(targetPath);

  if (type === FILE_TYPE) {
    const sourcePath = source.path();
    const settings = await getInfoSettingsFile(sourcePath, type);

    if (settings.exists()) {
      settings.copyTo(getInfoSettingsPath(targetPath, type));
    }
  }

  return target;
};

export const moveFileRaw = async (source, targetPath, type = '') => {
  if (!type) {
    type = await getItemType(source);
  }

  const target = await source.moveTo(targetPath);

  if (type === FILE_TYPE) {
    const sourcePath = source.path();
    const settings = await getInfoSettingsFile(sourcePath, type);

    if (settings.exists()) {
      settings.moveTo(getInfoSettingsPath(targetPath, type));
    }
  }

  return target;
};

export const renameFileRaw = (source, newName, type = '') => {
  const targetPath = `${source.parentPath()}/${newName}`;

  return moveFileRaw(source, targetPath, type);
};
