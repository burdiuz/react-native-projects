import { createHistory, fromObject, toObject } from './history';
export const SETTING_NAME = 'file.history';

export const getValue = (settings) => settings[SETTING_NAME];
export const setValue = (settings, value) => {
  settings[SETTING_NAME] = value;
};
export const initializer = (entity, entityType, settingName) => createHistory();
export const parser = ({ value }) => fromObject(value);
export const toRawConverter = (setting, entity, entityType, settingName) => ({
  value: toObject(setting),
});
