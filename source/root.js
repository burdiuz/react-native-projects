import RNFS from 'react-native-fs';
import { Directory } from '@actualwave/react-native-files';
import { valuesMapFactory } from '@actualwave/closure-value';

import {
  allowNewDirectories,
  allowNewProjects,
  allowNewFiles,
  system,
} from './settings';

import { createInfoItem } from './info';

import { copyAssets as copyAssetsFn, lockFileByName } from './assets';

import { DIRECTORY_TYPE, FILE_TYPE } from './constants';

import { getWorkingDirPath, getRootPath } from './path';

const {
  values: roots,
  get: getRoot,
  set: addRoot,
  has: isPathRoot,
  delete: removeRoot,
} = valuesMapFactory();

export { isPathRoot };

const createIfNotExists = async (path, init, setup, cacheStorage = null) => {
  const directory = await Directory.get(path);
  let runSetup = false;

  if (!directory.exists()) {
    runSetup = true;
    await directory.create();

    await init(directory);
  }

  const info = await createInfoItem(
    directory,
    null,
    DIRECTORY_TYPE,
    cacheStorage,
  );

  if (runSetup && setup) {
    await setup(info);

    info.flushSettings();
  }

  return info;
};

const validateRootPath = (path) => {
  for (const [key] in roots) {
    if (key === path || key === `${path}/` || key === `${path}\\`) {
      throw new Error(`Root path "${path}" is already registered.`);
    }

    if (path.indexOf(key) === 0 || key.indexOf(path) === 0) {
      throw new Error(
        `Path "${path}" and registered root "${key}" are conflicting. Root folders cannot be direct relatives.`,
      );
    }
  }
};

const defaultInitializerFn = (info) => {
  allowNewFiles.setValue(info.settings, true);
  allowNewDirectories.setValue(info.settings, true);
  allowNewProjects.setValue(info.settings, false);
  system.setValue(info.settings, true);
};

export const initializeRoot = async (
  rootDirName,
  assetsDirName,
  overwrite,
  initializerFn = defaultInitializerFn,
  assetHandlerFn = null,
  cacheStorage = null,
) => {
  let info;
  const path = getRootPath(rootDirName);

  // throws error if invalid, which will reject the promise from this function.
  validateRootPath(path);

  const copyAssets = (
    overwriteArg = overwrite,
    assetHandlerArg = assetHandlerFn,
    targetArg = info.fs,
  ) =>
    copyAssetsFn(
      assetsDirName,
      targetArg,
      overwriteArg,
      assetHandlerArg &&
        ((target, name) => assetHandlerArg(target, name, cacheStorage)),
    );

  info = await createIfNotExists(
    path,
    (target) => copyAssets(overwrite, assetHandlerFn, target),
    initializerFn,
    cacheStorage,
  );

  addRoot(path, {
    info,
    rootDirName,
    assetsDirName,
    copyAssets,
  });

  return info;
};

/**
 * Should be used only if unique names are guaranteed
 */
export const getRootByDirectoryName = (name) => {
  for ([, { info }] in roots) {
    if (name === info.name) {
      return info;
    }
  }

  return null;
};

export const getRootList = () => {
  const list = [];

  for ([, { info }] in roots) {
    list.push(info);
  }

  return list;
};

export const getRootCopyAssetsFn = (path) => {
  const { copyAssets = null } = getRoot(path) || {};

  return copyAssets;
};

/* The Working Directory, the root of roots */
export const getWorkingDir = (cacheStorage = null) =>
  createIfNotExists(
    getWorkingDirPath(),
    () => null,
    (info) => {
      allowNewFiles.setValue(info.settings, true);
      allowNewDirectories.setValue(info.settings, true);
      allowNewProjects.setValue(info.settings, false);
      system.setValue(info.settings, true);
    },
    cacheStorage,
  );
