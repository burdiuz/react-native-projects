import { copyFileRaw, moveFileRaw, renameFileRaw } from './fs/copy';
import { createInfoItem } from './info';

/*
  Do not cache the result of operation, because otherwise we will cache 
  file with no information about parent project if any and will not be 
  able to retrieve proper version.
*/
export const copyTo = async (source, targetPath, cacheStorage = null) => {
  const { fs, type } = source;

  const targetFs = await copyFileRaw(fs, targetPath, type);

  const targetParent = cacheStorage && cacheStorage.get(targetFs.parentPath());

  if (targetParent) {
    targetParent.updated();
  }

  return createInfoItem(targetFs, null, type);
};

export const moveTo = async (source, targetPath, cacheStorage = null) => {
  const { fs, type } = source;

  const targetFs = await moveFileRaw(fs, targetPath, type);

  await fs.update();
  source.updated();
  source.parentUpdated();

  const targetParent = cacheStorage && cacheStorage.get(targetFs.parentPath());

  if (targetParent) {
    targetParent.updated();
  }

  return createInfoItem(targetFs, null, type);
};

export const renameTo = async (source, newName) => {
  const { fs, project, type } = source;

  const target = await renameFileRaw(fs, newName, type);

  source.resetTarget(target, project);
  source.updated();

  return source;
};
