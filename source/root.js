import RNFS from 'react-native-fs';
import { Directory } from '@actualwave/react-native-files';

import {
  DIRECTORY_TYPE,
  FILE_TYPE,
  PROJECT_ASSETS_FOLDER,
  CONTAINER_ASSETS_FOLDER,
  TEMPLATES_ASSETS_FOLDER,
  SNIPPETS_ASSETS_FOLDER,
  MODULES_ASSETS_FOLDER,
  TOOLS_ASSETS_FOLDER,
} from './constants';

import {
  getRootPath,
  getProjectsPath,
  getContainersPath,
  getTemplatesPath,
  getSnippetsPath,
  getModulesPath,
  getToolsPath,
} from './path';

import { allowNewDirectories, allowNewProjects, allowNewFiles, system } from './settings';

import { createInfoItem } from './info';

import { copyAssets, lockFileByName } from './assets';

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

const initProjectsContent = (target) => copyAssets(PROJECT_ASSETS_FOLDER, target, true);

const initContainersContent = (target) => copyAssets(CONTAINER_ASSETS_FOLDER, target, true);

const initTemplatesContent = (target) => copyAssets(TEMPLATES_ASSETS_FOLDER, target, true);

const initSnippetsContent = (target) => copyAssets(SNIPPETS_ASSETS_FOLDER, target, true);

const initModulesContent = (target) =>
  copyAssets(MODULES_ASSETS_FOLDER, target, true, lockFileByName);

const initToolsContent = (target) => copyAssets(TOOLS_ASSETS_FOLDER, target, true);

const initRootSettings = (info) => {
  allowNewFiles.setValue(info.settings, true);
  allowNewDirectories.setValue(info.settings, true);
  allowNewProjects.setValue(info.settings, false);
  system.setValue(info.settings, true);
};

const initProjectsSettings = (info) => {
  allowNewFiles.setValue(info.settings, true);
  allowNewDirectories.setValue(info.settings, true);
  allowNewProjects.setValue(info.settings, true);
  system.setValue(info.settings, true);
};

const initContainersSettings = (info) => {
  allowNewFiles.setValue(info.settings, true);
  allowNewDirectories.setValue(info.settings, true);
  system.setValue(info.settings, true);
};

const initTemplatesSettings = (info) => {
  allowNewFiles.setValue(info.settings, true);
  allowNewDirectories.setValue(info.settings, true);
  system.setValue(info.settings, true);
};

const initSnippetsSettings = (info) => {
  allowNewFiles.setValue(info.settings, true);
  allowNewDirectories.setValue(info.settings, true);
  system.setValue(info.settings, true);
};

const initModulesSettings = (info) => {
  allowNewFiles.setValue(info.settings, true);
  allowNewDirectories.setValue(info.settings, true);
  system.setValue(info.settings, true);
};

const initToolsSettings = (info) => {
  allowNewFiles.setValue(info.settings, true);
  allowNewDirectories.setValue(info.settings, true);
  system.setValue(info.settings, true);
};

/* The Root, the root of roots */
export const getRoot = (cacheStorage = null) =>
  createIfNotExists(getRootPath, () => null, initRootSettings, cacheStorage);

export const getProjectsRoot = (cacheStorage = null) =>
  createIfNotExists(getProjectsPath, initProjectsContent, initProjectsSettings, cacheStorage);

export const getContainersRoot = (cacheStorage = null) =>
  createIfNotExists(getContainersPath, initContainersContent, initContainersSettings, cacheStorage);

export const getTemplatesRoot = (cacheStorage = null) =>
  createIfNotExists(getTemplatesPath, initTemplatesContent, initTemplatesSettings, cacheStorage);

export const getSnippetsRoot = (cacheStorage = null) =>
  createIfNotExists(getSnippetsPath, initSnippetsContent, initSnippetsSettings, cacheStorage);

export const getModulesRoot = (cacheStorage = null) =>
  createIfNotExists(getModulesPath, initModulesContent, initModulesSettings, cacheStorage);

export const getToolsRoot = (cacheStorage = null) =>
  createIfNotExists(getToolsPath, initToolsContent, initToolsSettings, cacheStorage);

export const getRootDirectories = async (cacheStorage = null) => {
  const projects = await getProjectsRoot(cacheStorage);
  const containers = await getContainersRoot(cacheStorage);
  const templates = await getTemplatesRoot(cacheStorage);
  const snippets = await getSnippetsRoot(cacheStorage);
  const modules = await getModulesRoot(cacheStorage);
  const tools = await getToolsRoot(cacheStorage);

  return {
    projects,
    containers,
    templates,
    snippets,
    modules,
    tools,
  };
};
