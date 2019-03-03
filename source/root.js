import RNFS from 'react-native-fs';
import { Directory } from '@actualwave/react-native-files';

import { DIRECTORY_TYPE } from './constants';
import {
  getProjectsPath,
  getContainersPath,
  getTemplatesPath,
  getSnippetsPath,
  getToolsPath,
} from './path';
import { allowNewDirectories, allowNewProjects, system } from './settings';

import { createInfoItem } from './info';

const PROJECT_ASSETS_FOLDER = 'projects';
const CONTAINER_ASSETS_FOLDER = 'containers';
const TEMPLATES_ASSETS_FOLDER = 'templates';
const SNIPPETS_ASSETS_FOLDER = 'snippets';
const TOOLS_ASSETS_FOLDER = 'tools';

const copyAssets = async (sourceDirName, target) => {
  try {
    const files = await RNFS.readDirAssets(sourceDirName);
    const { length } = files;

    for (let index = 0; index < length; index++) {
      const file = files[index];
      const { name } = file;
      if (file.isFile()) {
        await RNFS.copyFileAssets(`${sourceDirName}/${name}`, target.getChildPath(name));
      } else {
        console.warn(`Asset ${name} is not a file and cannot be copied.`);
      }
    }
  } catch (error) {
    console.log('Asset copying error:', error);
  }
};

const createIfNotExists = async (getPath, init, setup, cacheStorage = null) => {
  const path = await getPath();
  const directory = await Directory.get(path);
  let runSetup = false;

  if (!directory.exists()) {
    runSetup = true;
    await directory.create();
    await init(directory);
  }

  const info = await createInfoItem(directory, null, DIRECTORY_TYPE, cacheStorage);

  if (runSetup && setup) {
    await setup(info);

    info.flushSettings();
  }

  return info;
};

const initProjectsContent = (target) => copyAssets(PROJECT_ASSETS_FOLDER, target);

const initContainersContent = (target) => copyAssets(CONTAINER_ASSETS_FOLDER, target);

const initTemplatesContent = (target) => copyAssets(TEMPLATES_ASSETS_FOLDER, target);

const initSnippetsContent = (target) => copyAssets(SNIPPETS_ASSETS_FOLDER, target);

const initToolsContent = (target) => copyAssets(TOOLS_ASSETS_FOLDER, target);

const initProjectsSettings = (info) => {
  allowNewDirectories.setValue(info.settings, true);
  allowNewProjects.setValue(info.settings, true);
  system.setValue(info.settings, true);
};

const initContainersSettings = (info) => {
  system.setValue(info.settings, true);
};

const initTemplatesSettings = (info) => {
  system.setValue(info.settings, true);
};

const initSnippetsSettings = (info) => {
  system.setValue(info.settings, true);
};

const initToolsSettings = (info) => {
  system.setValue(info.settings, true);
};

export const getProjectsRoot = (cacheStorage = null) =>
  createIfNotExists(getProjectsPath, initProjectsContent, initProjectsSettings, cacheStorage);

export const getContainersRoot = (cacheStorage = null) =>
  createIfNotExists(getContainersPath, initContainersContent, initContainersSettings, cacheStorage);

export const getTemplatesRoot = (cacheStorage = null) =>
  createIfNotExists(getTemplatesPath, initTemplatesContent, initTemplatesSettings, cacheStorage);

export const getSnippetsRoot = (cacheStorage = null) =>
  createIfNotExists(getSnippetsPath, initSnippetsContent, initSnippetsSettings, cacheStorage);

export const getToolsRoot = (cacheStorage = null) =>
  createIfNotExists(getToolsPath, initToolsContent, initToolsSettings, cacheStorage);

export const getRootDirectories = async (cacheStorage = null) => {
  const projects = await getProjectsRoot(cacheStorage);
  const containers = await getContainersRoot(cacheStorage);
  const templates = await getTemplatesRoot(cacheStorage);
  const snippets = await getSnippetsRoot(cacheStorage);
  const tools = await getToolsRoot(cacheStorage);

  return {
    projects,
    containers,
    templates,
    snippets,
    tools,
  };
};
