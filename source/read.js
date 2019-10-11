import { Directory } from '@actualwave/react-native-files';

import { readDirectoryRaw } from './fs/directory';

import { DirectoryInfo, createInfoItems } from './info';

export const readDirectory = async (directory, project = null, filterFn = null, cacheStorage = undefined) => {
  let list;

  if (directory instanceof DirectoryInfo) {
    list = await readDirectoryRaw(directory.fs, filterFn);
  } else {
    list = await readDirectoryRaw(directory, filterFn);
  }

  return createInfoItems(list, project, cacheStorage);
};

export const readProjectContents = async (project, filterFn, cacheStorage = undefined) => {
  const list = await readDirectoryRaw(project.directory, filterFn);

  return createInfoItems(list, project, cacheStorage);
};

export const readDirectoryByPath = async (path, project = null, filterFn = null, cacheStorage = undefined) => {
  const directory = await Directory.get(path);

  return readDirectory(directory, project, filterFn, cacheStorage);
};
