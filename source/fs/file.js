import { File, Directory } from '@actualwave/react-native-files';
import { parseJSON, convertToJSON } from '../utils';

export const createFileRaw = async (directory, fileName, data) => {
  const parent = typeof directory === 'string' ? await Directory.get(directory) : directory;
  const exists = await parent.has(fileName);
  if (exists) {
    return Promise.reject(new Error(`File "${fileName}" already exists.`));
  }

  return parent.createFile(fileName, data);
};

export const deleteFileRaw = async (file) => {
  if (!file.exists()) {
    return Promise.reject(new Error(`File "${file.name()}" does not exist.`));
  }

  return file.unlink();
};

/*
  Create file functions throw error if file exists
  Write file functions throw error if file does not exist
*/

export const createJSONFile = (file, data) => {
  if (file.exists()) {
    return Promise.reject(new Error(`File "${file.name()}" already exists.`));
  }

  return file.write(() => convertToJSON(data));
};

export const readJSONFile = async (file) => {
  if (!file.exists()) {
    return Promise.reject(new Error(`File "${file.name()}" does not exist.`));
  }

  const content = await file.read();

  return parseJSON(content);
};

export const writeJSONFile = async (file, data) => {
  if (!file.exists()) {
    return Promise.reject(new Error(`File "${file.name()}" does not exist.`));
  }

  return file.write(() => convertToJSON(data));
};
