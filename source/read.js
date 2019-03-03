import { Directory } from '@actualwave/react-native-files';

import { readDirectoryRaw } from './fs/directory';

import { DirectoryInfo, createInfoItems } from './info';

export const readDirectory = async (directory, project = null, cacheStorage = undefined) => {
  let list;

  if (directory instanceof DirectoryInfo) {
    list = await readDirectoryRaw(directory.fs);
  } else {
    list = await readDirectoryRaw(directory);
  }

  return createInfoItems(list, project, cacheStorage);
};

export const readProjectContents = async (project, cacheStorage = undefined) => {
  const list = await readDirectoryRaw(project.directory);

  return createInfoItems(list, project, cacheStorage);
};

export const readDirectoryByPath = async (path, project = null, cacheStorage = undefined) => {
  const directory = await Directory.get(path);

  return readDirectory(directory, project, cacheStorage);
};
