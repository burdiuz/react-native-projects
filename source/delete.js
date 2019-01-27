import { deleteDirectoryRaw } from './fs/directory';
import { deleteFileRaw } from './fs/file';

import { getParentDirectory } from './utils';

export const deleteFile = async (entity, cacheStorage = null) => {
  const result = await deleteFileRaw(entity.fs);

  if (cacheStorage) {
    cacheStorage.delete(entity.path);
  }

  return result;
};

export const deleteFileByName = async (
  fileName,
  projectInfo,
  directoryInfo = null,
  cacheStorage = null,
) => {
  const parent = await getParentDirectory(projectInfo, directoryInfo);

  const file = await parent.getChildIfExist(fileName);
  let result;

  if (file) {
    result = await deleteFileRaw(file);

    if (cacheStorage) {
      cacheStorage.delete(file.path());
    }
  }

  return result;
};

export const deleteDirectory = async (entity, cacheStorage = null) => {
  const result = await deleteDirectoryRaw(entity.fs);

  if (cacheStorage) {
    cacheStorage.delete(entity.path);
  }

  return result;
};

export const deleteDirectoryByName = deleteFileByName;

export const deleteProject = deleteDirectory;

export const deleteProjectByName = deleteFileByName;
