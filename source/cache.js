import { createInfoItem, createInfoItems } from './info';
import { createFile, createDirectory, createProject } from './create';
import {
  deleteFile,
  deleteFileByName,
  deleteDirectory,
  deleteDirectoryByName,
  deleteProject,
  deleteProjectByName,
} from './delete';

import { readDirectory, readProjectContents, readDirectoryByPath } from './read';

import { copyTo, moveTo, renameTo } from './copy';

import { getFromPath, getParent } from './get';

import {
  getRoot,
  getProjectsRoot,
  getContainersRoot,
  getTemplatesRoot,
  getSnippetsRoot,
  getToolsRoot,
  getModulesRoot,
  getRootDirectories,
} from './root';

// don't think its necessary to cache roots since they are intended to be read-only
// import {} from './root';

const id = (path) => `${path}`;

export const createCacheStorage = () => {
  const map = new Map();

  return {
    get: (path) => map.get(id(path)),
    set: (path, item) => map.set(id(path), item),
    delete: (path) => map.delete(id(path)),
  };
};

/*
  Factory function that supports caching always has last argument cacheStorage.
  IMPORTANT: Function.length does not count arguments with default value, that's
  why we cannot use it to put cahceStorage into arguments list by index.
*/
export const makeFactoryCached = (factoryFn, cacheStorage, argIndex) => {
  if (typeof argIndex !== 'number' || argIndex < 0) {
    throw new Error(
      'argIndex must be a valid unsigned integer reflecting cacheStorage placement index',
    );
  }

  return (...args) => {
    args[argIndex] = cacheStorage;

    return factoryFn(...args);
  };
};

export const getCachedFactories = (cacheStorage = createCacheStorage()) => ({
  getCached: cacheStorage.get,
  setCached: cacheStorage.set,
  deleteCached: cacheStorage.delete,

  createInfoItem: makeFactoryCached(createInfoItem, cacheStorage, 3),
  createInfoItems: makeFactoryCached(createInfoItems, cacheStorage, 2),

  createFile: makeFactoryCached(createFile, cacheStorage, 4),
  createDirectory: makeFactoryCached(createDirectory, cacheStorage, 3),
  createProject: makeFactoryCached(createProject, cacheStorage, 4),

  readDirectory: makeFactoryCached(readDirectory, cacheStorage, 3),
  readProjectContents: makeFactoryCached(readProjectContents, cacheStorage, 2),
  readDirectoryByPath: makeFactoryCached(readDirectoryByPath, cacheStorage, 3),

  copyTo: makeFactoryCached(copyTo, cacheStorage, 2),
  moveTo: makeFactoryCached(moveTo, cacheStorage, 2),
  renameTo: makeFactoryCached(renameTo, cacheStorage, 2),

  deleteFile: makeFactoryCached(deleteFile, cacheStorage, 1),
  deleteFileByName: makeFactoryCached(deleteFileByName, cacheStorage, 3),
  deleteDirectory: makeFactoryCached(deleteDirectory, cacheStorage, 1),
  deleteDirectoryByName: makeFactoryCached(deleteDirectoryByName, cacheStorage, 3),
  deleteProject: makeFactoryCached(deleteProject, cacheStorage, 1),
  deleteProjectByName: makeFactoryCached(deleteProjectByName, cacheStorage, 3),

  getFromPath: makeFactoryCached(getFromPath, cacheStorage, 2),
  getParent: makeFactoryCached(getParent, cacheStorage, 1),

  getRoot: makeFactoryCached(getRoot, cacheStorage, 0),
  getProjectsRoot: makeFactoryCached(getProjectsRoot, cacheStorage, 0),
  getContainersRoot: makeFactoryCached(getContainersRoot, cacheStorage, 0),
  getTemplatesRoot: makeFactoryCached(getTemplatesRoot, cacheStorage, 0),
  getSnippetsRoot: makeFactoryCached(getSnippetsRoot, cacheStorage, 0),
  getModulesRoot: makeFactoryCached(getModulesRoot, cacheStorage, 0),
  getToolsRoot: makeFactoryCached(getToolsRoot, cacheStorage, 0),
  getRootDirectories: makeFactoryCached(getRootDirectories, cacheStorage, 0),
});
