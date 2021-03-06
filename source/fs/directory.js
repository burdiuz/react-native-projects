import { Directory } from '@actualwave/react-native-files';

import { FILE_TYPE, DIRECTORY_TYPE, PROJECT_TYPE } from '../constants';
import { getItemType, isSettingsFileName } from '../utils';

export const createDirectoryRaw = async (directory, dirName) => {
  const parent =
    typeof directory === 'string' ? await Directory.get(directory) : directory;
  const exists = await parent.has(dirName);

  if (exists) {
    return Promise.reject(new Error(`Directory "${dirName}" already exists.`));
  }

  return parent.createDirectory(dirName);
};

export const deleteDirectoryRaw = async (directory) => {
  if (!directory.exists()) {
    return Promise.reject(
      new Error(`Directory "${directory.name()}" does not exist.`),
    );
  }

  return directory.unlink();
};

export const readDirectoryRaw = async (
  directory,
  filterFn = null,
  caseSensitive = false,
) => {
  const contents = await directory.read();

  return contents
    .filter((item) => {
      if (isSettingsFileName(item.name())) {
        return false;
      }

      if (filterFn) {
        return filterFn(item);
      }

      return true;
    })
    .sort((a, b) => {
      const aDir = a.isDirectory();
      const bDir = b.isDirectory();

      if (aDir !== bDir) {
        return aDir < bDir ? -1 : 1;
      }

      const aName = a.name();
      const bName = b.name();

      if (caseSensitive) {
        return aName < bName ? -1 : 1;
      }

      return aName.toLowerCase() < bName.toLowerCase() ? -1 : 1;
    });
};

export const splitByTypeDirectoryContents = async (directory) => {
  const contents = await readDirectoryRaw(directory);
  const projects = [];
  const directories = [];
  const files = [];
  const total = contents.length;

  for (let index = 0; index < total; index++) {
    const item = contents[index];
    const type = await getItemType(item);

    switch (type) {
      case PROJECT_TYPE:
        projects.push(item);
        break;
      case DIRECTORY_TYPE:
        directories.push(item);
        break;
      case FILE_TYPE:
        files.push(item);
        break;
    }
  }

  return {
    [PROJECT_TYPE]: projects,
    [DIRECTORY_TYPE]: directories,
    [FILE_TYPE]: files,
  };
};

export const countDirectoryChildren = async (directory) => {
  const contents = await readDirectoryRaw(directory);
  return contents.length;
};
