import { Directory, File, Path, splitPath } from '@actualwave/react-native-files';
import { settingsStorage, parseSettings, convertSettingsToRaw } from '@actualwave/rn-playground-settings';
import { getInfoSettingsPath } from '../utils';
import { createJSONFile, readJSONFile, writeJSONFile } from './file';

export const getInfoSettingsFile = (path, type) => File.get(getInfoSettingsPath(path, type));

export const readSettings = async (path, type, entity) => {
  const file = await getInfoSettingsFile(path, type);
  let data;
  try {
    data = await readJSONFile(file);
  } catch (error) {
    // console.log('Error reading Settings file:', error);
  }

  return parseSettings(type, entity, data || {});
};

export const readSettingsFor = async (entity) => {
  const settings = await readSettings(entity.path, entity.type, entity);

  entity.applySettings(settings);

  return settings;
};

export const writeSettings = async (path, type, entity, settings) => {
  const file = await getInfoSettingsFile(path, type);
  const data = await convertSettingsToRaw(type, entity, settings);

  if (file.exists()) {
    return writeJSONFile(file, data);
  }

  return createJSONFile(file, data);
};

export const writeSettingsFor = async (entity) =>
  writeSettings(entity.path, entity.type, entity, entity.getSettings());
