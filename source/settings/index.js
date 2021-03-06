import { FILE_TYPE, DIRECTORY_TYPE, PROJECT_TYPE } from '../constants';

import {
  registerSettingsEntityType,
  createExportableSetting,
} from '@actualwave/rn-playground-settings';

import * as pinned from './pinned';
import * as system from './system';
import * as fileHistory from './filehistory';
import * as directoryExpand from './directoryexpand';
import * as projectName from './projectname';
import * as fileLock from './filelock';
import * as fileRequiresBuild from './filerequiresbuild';
import * as fileRunContainer from './fileruncontainer';
import * as gistFileTarget from './gistfiletarget';
import * as gistProjectTarget from './gistprojecttarget';
import * as allowNewDirectories from './allownewdirectories';
import * as allowNewFiles from './allownewfiles';
import * as allowNewProjects from './allownewprojects';

export const applySettingHandler = (
  { SETTING_NAME, initializer, parser, toRawConverter },
  ...entityTypes
) => createExportableSetting(SETTING_NAME, parser, toRawConverter, initializer, ...entityTypes);

export const applySettingHandlers = (handlers, ...entityTypes) =>
  Object.keys(handlers).forEach((key) => {
    const handler = handlers[key];
    applySettingHandler(handler, ...entityTypes);
  });

// Initialize default settings

registerSettingsEntityType(FILE_TYPE);
registerSettingsEntityType(DIRECTORY_TYPE);
registerSettingsEntityType(PROJECT_TYPE);

applySettingHandlers({ pinned, system }, PROJECT_TYPE, DIRECTORY_TYPE, FILE_TYPE);
applySettingHandlers(
  { fileHistory, fileLock, gistFileTarget, fileRequiresBuild, fileRunContainer },
  FILE_TYPE,
);
applySettingHandlers({ projectName, gistProjectTarget }, PROJECT_TYPE);

applySettingHandlers(
  { directoryExpand, allowNewDirectories, allowNewFiles, allowNewProjects },
  DIRECTORY_TYPE,
  PROJECT_TYPE,
);

export {
  pinned,
  system,
  fileHistory,
  fileLock,
  fileRequiresBuild,
  fileRunContainer,
  gistFileTarget,
  gistProjectTarget,
  projectName,
  directoryExpand,
  allowNewDirectories,
  allowNewFiles,
  allowNewProjects,
};
