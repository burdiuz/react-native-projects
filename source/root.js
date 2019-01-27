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
import { allowNewDirectories, allowNewProjects } from './settings';

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

const createIfNotExists = async (getPath, init, setup) => {
  const path = await getPath();
  const directory = await Directory.get(path);
  let runSetup = false;

  if (!directory.exists()) {
    let runSetup = true;
    await directory.create();
    await init(directory);
  }

  const info = await createInfoItem(directory, null, DIRECTORY_TYPE);

  if (runSetup) {
    await setup(info);
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
};

const initContainersSettings = (info) => {};

const initTemplatesSettings = (info) => {};

const initSnippetsSettings = (info) => {};

const initToolsSettings = (info) => {};

export const getProjectsRoot = () =>
  createIfNotExists(getProjectsPath, initProjectsContent, initProjectsSettings);

export const getContainersRoot = () =>
  createIfNotExists(getContainersPath, initContainersContent, initContainersSettings);

export const getTemplatesRoot = () =>
  createIfNotExists(getTemplatesPath, initTemplatesContent, initTemplatesSettings);

export const getSnippetsRoot = () =>
  createIfNotExists(getSnippetsPath, initSnippetsContent, initSnippetsSettings);

export const getToolsRoot = () =>
  createIfNotExists(getTemplatesPath, initTemplatesContent, initToolsSettings);

export const getRootDirectories = async () => {
  const projects = await getProjectsRoot();
  const containers = await getContainersRoot();
  const templates = await getTemplatesRoot();
  const snippets = await getSnippetsRoot();
  const tools = await getToolsRoot();

  return {
    projects,
    containers,
    templates,
    snippets,
    tools,
  };
};
