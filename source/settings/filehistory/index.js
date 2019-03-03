import { createHistoryFor, fromObject, toObject } from './history';
import { FILE_TYPE } from '../../constants';
export const SETTING_NAME = 'file.history';

export const getValue = (settings) => settings[SETTING_NAME];

export const setValue = (settings, value) => {
  settings[SETTING_NAME] = value;
};

export const initializer = async (fileInfo, entityType, settingName) => {
  if (entityType !== FILE_TYPE) {
    return undefined;
  }

  return createHistoryFor(fileInfo.fs);
};
export const parser = ({ value }) => fromObject(value);
export const toRawConverter = (setting, entity, entityType, settingName) => ({
  value: toObject(setting),
});
