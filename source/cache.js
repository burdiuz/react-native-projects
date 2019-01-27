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

// don't think its necessary to cache roots since they are intended to be read-only
// import {} from './root';

const id = (path, type) => `${path}`;

export const createCacheStorage = () => {
  const map = new Map();

  return {
    get: (path, item) => {
      return map.get(id(path));
    },
    set: (path, item) => {
      map.set(id(path), item);
    },
    delete: (path) => {
      map.delete(id(path));
    },
  };
};

// factory function that supports caching always has  last argument cacheStorage.
export const makeFactoryCached = (factoryFn, cacheStorage) => {
  const argIndex = factoryFn.length - 1;

  if (argIndex < 0) {
    throw new Error('Cannot read arguments length from Function object.');
  }

  return (...args) => {
    args[argIndex] = cacheStorage;

    return factoryFn(...args);
  };
};

export const getCachedFactories = (cacheStorage = createCacheStorage()) => ({
  createInfoItem: makeFactoryCached(createInfoItem, cacheStorage),
  createInfoItems: makeFactoryCached(createInfoItems, cacheStorage),

  createFile: makeFactoryCached(createFile, cacheStorage),
  createDirectory: makeFactoryCached(createDirectory, cacheStorage),
  createProject: makeFactoryCached(createProject, cacheStorage),

  deleteFile: makeFactoryCached(deleteFile, cacheStorage),
  deleteFileByName: makeFactoryCached(deleteFileByName, cacheStorage),
  deleteDirectory: makeFactoryCached(deleteDirectory, cacheStorage),
  deleteDirectoryByName: makeFactoryCached(deleteDirectoryByName, cacheStorage),
  deleteProject: makeFactoryCached(deleteProject, cacheStorage),
  deleteProjectByName: makeFactoryCached(deleteProjectByName, cacheStorage),


});
