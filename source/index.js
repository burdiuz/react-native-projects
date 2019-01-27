import { Directory } from '@actualwave/react-native-files';

import {
  fileHistory,
  fileLock,
  fileImport,
  fsTarget,
  gistTarget,
  directoryExpand,
  projectName,
  applySettingHandler,
  applySettingHandlers,
} from './settings';

import {
  readDirectoryRaw,
  countDirectoryChildren,
  splitByTypeDirectoryContents,
} from './fs/directory';

import { FileInfo, DirectoryInfo, ProjectInfo, createInfoItem, createInfoItems } from './info';

import { readSettings, readSettingsFor, writeSettings, writeSettingsFor } from './fs/settings';

import { DEFAULT_PROJECTS_PATH, PROJECT_TYPE, DIRECTORY_TYPE, FILE_TYPE } from './constants';

import { createFile, createDirectory, createProject } from './create';

import {
  deleteFile,
  deleteFileByName,
  deleteDirectory,
  deleteDirectoryByName,
  deleteProject,
  deleteProjectByName,
} from './delete';

import {
  isValidDirectoryName,
  pausterizeName,
  generateDirectoryNameFrom,
  isSettingsFileName,
  getSettingsFileName,
  isProjectDirectory,
  getItemType,
  getInfoSettingsPath,
} from './utils';

import { getContainersRoot, getProjectsRoot, getTemplatesRoot, getRootDirectories } from './root';

export const readDirectory = async (directory, project = null) => {
  let list;

  if (directory instanceof DirectoryInfo) {
    list = await readDirectoryRaw(directory.fs);
  } else {
    list = await readDirectoryRaw(directory);
  }

  return createInfoItems(list, project);
};

export const readProjectContents = async (project) => {
  const list = await readDirectoryRaw(project.directory);

  return createInfoItems(list, project);
};

export const readDirectoryByPath = async (path, project = null) => {
  const directory = await Directory.get(path);

  return readDirectory(directory, project);
};

export {
  FileInfo,
  DirectoryInfo,
  ProjectInfo,
  createInfoItem,
  createInfoItems,
  fileHistory,
  fileLock,
  fileImport,
  fsTarget,
  gistTarget,
  directoryExpand,
  projectName,
  applySettingHandler,
  applySettingHandlers,
  countDirectoryChildren,
  splitByTypeDirectoryContents,
  readSettings,
  readSettingsFor,
  writeSettings,
  writeSettingsFor,
  DEFAULT_PROJECTS_PATH,
  PROJECT_TYPE,
  DIRECTORY_TYPE,
  FILE_TYPE,
  createFile,
  createDirectory,
  createProject,
  deleteFile,
  deleteFileByName,
  deleteDirectory,
  deleteDirectoryByName,
  deleteProject,
  deleteProjectByName,
  isValidDirectoryName,
  pausterizeName,
  generateDirectoryNameFrom,
  isSettingsFileName,
  getSettingsFileName,
  isProjectDirectory,
  getItemType,
  getInfoSettingsPath,
  getContainersRoot,
  getProjectsRoot,
  getTemplatesRoot,
  getRootDirectories,
};
