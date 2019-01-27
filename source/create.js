import { createInfoItems, createInfoItem } from './info';
import { FILE_TYPE, DIRECTORY_TYPE, PROJECT_TYPE } from './constants';
import { createDirectoryRaw } from './fs/directory';
import { createFileRaw } from './fs/file';
import { writeSettingsFor } from './fs/settings';

import { generateDirectoryNameFrom, getParentDirectory } from './utils';

// FIXME init settings file

export const createFile = async (fileName, content = '', projectInfo, directoryInfo = null) => {
  const parent = await getParentDirectory(projectInfo, directoryInfo);

  const file = await createFileRaw(parent, fileName, content);

  return createInfoItem(file, projectInfo, FILE_TYPE);
};

export const createDirectory = async (directoryName, projectInfo, directoryInfo = null) => {
  const parent = await getParentDirectory(projectInfo, directoryInfo);

  const directory = await createDirectoryRaw(parent, directoryName);

  return createInfoItem(directory, projectInfo, DIRECTORY_TYPE);
};

export const createProject = async (
  projectName,
  proposedDirectoryName,
  parentProjectInfo,
  directoryInfo = null,
) => {
  const parent = await getParentDirectory(parentProjectInfo, directoryInfo);

  /*
  Project name must be tested on validity and if valid, used as is.
  Otherwise generate unique folder name.
  This must be reflected on UI and alert should be displayed that since
  Project name is not valid directory name, random directory name will be
  generated.
  */
  const directoryName = proposedDirectoryName || generateDirectoryNameFrom(projectName);

  const directory = await createDirectoryRaw(parent, directoryName);

  const projectInfo = await createInfoItem(directory, projectInfo, PROJECT_TYPE);

  projectInfo.name = projectName;

  await writeSettingsFor(projectInfo);

  return projectInfo;
};
