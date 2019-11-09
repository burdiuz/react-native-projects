import { EXTERNAL_DIRECTORY_PATH } from '@actualwave/react-native-files';

export const getWorkingDirPath = () => EXTERNAL_DIRECTORY_PATH;

export const getRootPath = (folderName) => {
  const root = getWorkingDirPath();

  return `${root}/${folderName}`;
};
