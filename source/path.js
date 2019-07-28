import { EXTERNAL_DIRECTORY_PATH } from '@actualwave/react-native-files';

import {
  PROJECTS_DIR_NAME,
  TEMPLATES_DIR_NAME,
  CONTAINERS_DIR_NAME,
  SNIPPETS_DIR_NAME,
  MODULES_DIR_NAME,
  TOOLS_DIR_NAME,
} from './constants';

export const getRootPath = () => EXTERNAL_DIRECTORY_PATH;

export const getProjectsPath = () => {
  const root = getRootPath();

  return `${root}/${PROJECTS_DIR_NAME}`;
};

export const getContainersPath = () => {
  const root = getRootPath();

  return `${root}/${CONTAINERS_DIR_NAME}`;
};

export const getTemplatesPath = () => {
  const root = getRootPath();

  return `${root}/${TEMPLATES_DIR_NAME}`;
};

export const getSnippetsPath = () => {
  const root = getRootPath();

  return `${root}/${SNIPPETS_DIR_NAME}`;
};

export const getModulesPath = () => {
  const root = getRootPath();

  return `${root}/${MODULES_DIR_NAME}`;
};

export const getToolsPath = () => {
  const root = getRootPath();

  return `${root}/${TOOLS_DIR_NAME}`;
};
