import { deleteDirectoryRaw } from './fs/directory';
import { deleteFileRaw } from './fs/file';

import { getParentDirectory } from './utils';

export const deleteFile = (entity) => {
  return deleteFileRaw(entity.fs);
};

export const deleteFileByName = async (fileName, projectInfo, directoryInfo = null) => {
  const parent = await getParentDirectory(projectInfo, directoryInfo);

  const file = await parent.getChildIfExist(fileName);

  if (file) {
    await deleteFileRaw(file);
  }
};

export const deleteDirectory = (entity) => {
  return deleteDirectoryRaw(entity.fs);
};

export const deleteDirectoryByName = deleteFileByName;

export const deleteProject = deleteDirectory;

export const deleteProjectByName = deleteFileByName;
