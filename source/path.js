import { PermissionsAndroid } from 'react-native';
import {
  Directory,
  DOCUMENT_DIRECTORY_PATH,
  EXTERNAL_DIRECTORY_PATH,
} from '@actualwave/react-native-files';

export const PROJECTS_DIR_NAME = 'Projects';
export const TEMPLATES_DIR_NAME = 'File Templates';
export const CONTAINERS_DIR_NAME = 'Demo Containers';
export const SNIPPETS_DIR_NAME = 'Code Snippets';
export const MODULES_DIR_NAME = 'Modules';
export const TOOLS_DIR_NAME = 'Tools';

const requestExternalStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const getRootFilesPath = async () => {
  const allowedES = await requestExternalStoragePermission();

  return allowedES ? EXTERNAL_DIRECTORY_PATH : DOCUMENT_DIRECTORY_PATH;
};

export const getProjectsPath = async () => {
  const root = await getRootFilesPath();

  return `${root}/${PROJECTS_DIR_NAME}`;
};

export const getContainersPath = async () => {
  const root = await getRootFilesPath();

  return `${root}/${CONTAINERS_DIR_NAME}`;
};

export const getTemplatesPath = async () => {
  const root = await getRootFilesPath();

  return `${root}/${TEMPLATES_DIR_NAME}`;
};

export const getSnippetsPath = async () => {
  const root = await getRootFilesPath();

  return `${root}/${SNIPPETS_DIR_NAME}`;
};

export const getModulesPath = async () => {
  const root = await getRootFilesPath();

  return `${root}/${MODULES_DIR_NAME}`;
};

export const getToolsPath = async () => {
  const root = await getRootFilesPath();

  return `${root}/${TOOLS_DIR_NAME}`;
};
