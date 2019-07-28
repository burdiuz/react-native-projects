import { getFromPathIfExists } from '@actualwave/react-native-files';

import { createInfoItem } from './info';
import Info from './info/info';

export const getFromPath = async (path, project = null, cacheStorage = undefined) => {
  const item = await getFromPathIfExists(path);

  if (!item) {
    return null;
  }

  return createInfoItem(item, project, null, cacheStorage);
};

export const getParent = async (file, cacheStorage = undefined) => {
  let project;
  let parentFolder;

  if (file instanceof Info) {
    parentFolder = await file.fs.parent();
    project = file.project;

    /*
      if paths are equal or project path is not part of parent directory path, 
      then parent does not belong to this project.
    */
    if (!project || project.path === parentFolder.path || project.path.indexOf(parentFolder.path) < 0) {
      project = null;
    }
  } else {
    parentFolder = await file.parent();
    project = null;
  }

  return createInfoItem(parentFolder, project, null, cacheStorage);
};
