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
  createCacheStorage,
  getCachedFactories,
  ProjectsApiProvider,
  withProjectsApi,
} from './cache';

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

import {
  getContainersRoot,
  getProjectsRoot,
  getTemplatesRoot,
  getSnippetsRoot,
  getToolsRoot,
  getRootDirectories,
} from './root';

import { readDirectory, readProjectContents, readDirectoryByPath } from './read';

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
  getSnippetsRoot,
  getToolsRoot,
  getRootDirectories,
  createCacheStorage,
  getCachedFactories,
  ProjectsApiProvider,
  withProjectsApi,
  readDirectory,
  readProjectContents,
  readDirectoryByPath,
};
