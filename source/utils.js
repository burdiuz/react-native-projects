import { FILE_TYPE, DIRECTORY_TYPE, PROJECT_TYPE, DEFAULT_PROJECTS_PATH } from './constants';
import { splitPath, Directory } from '@actualwave/react-native-files';

export const convertToJSON = async (data) => JSON.stringify(data, null, 2);

export const parseJSON = async (data) => JSON.parse(data);

const DIR_NAME_RGX = /^[^\/<>:"\|?*\r\n]+$/;
export const isValidDirectoryName = (name) => DIR_NAME_RGX.test(name);

export const pausterizeName = (name) =>
  name.replace(/\s+/, ' ').replace(/\s*[\/<>:"\|?*_]+\s*/g, '_');

export const generateDirectoryNameFrom = (name) => `${pausterizeName(name)}_${Date.now()}`;

export const isSettingsFileName = (name) => name.charAt() === '.';

export const getSettingsFileName = (name, type) => {
  let base;

  switch (type) {
    case PROJECT_TYPE:
    case DIRECTORY_TYPE:
      base = `${type}`;
      break;
    default:
      base = name;
      break;
  }

  return `.${base}.info`;
};

export const isProjectDirectory = (directory) => {
  return directory.has(getSettingsFileName(directory.name(), PROJECT_TYPE));
};

export const getItemType = async (item) => {
  if (item.isDirectory()) {
    const isProject = await isProjectDirectory(item);

    if (isProject) {
      return PROJECT_TYPE;
    }

    return DIRECTORY_TYPE;
  }

  if (item.isFile()) {
    return FILE_TYPE;
  }

  return '';
};

export const getInfoSettingsPath = (path, type) => {
  const { parentPath, fileName } = splitPath(path);
  const settingsFileName = getSettingsFileName(fileName, type);
  const separator = path[parentPath.length];

  switch (type) {
    case PROJECT_TYPE:
    case DIRECTORY_TYPE:
      return `${path}${separator}${settingsFileName}`;
    default:
      const pathChar = parentPath[parentPath.length - 1];
      return `${parentPath}${separator}${settingsFileName}`;
  }
};

export const getParentDirectory = async (projectInfo, directoryInfo = null) => {
  if (directoryInfo) {
    return directoryInfo.directory;
  } else if (projectInfo) {
    return projectInfo.directory;
  }

  const parent = await Directory.get(DEFAULT_PROJECTS_PATH);

  if (!parent.exists()) {
    await parent.create();
  }

  return parent;
};
