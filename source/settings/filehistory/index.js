import {
  createHistory,
  createHistoryFor,
  fromObject,
  toObject,
} from './history';
import { createHistorySlice } from './historyslice';
import { create as createVersion, parseVersionString } from './version';

export const SETTING_NAME = 'file.history';

export const getValue = (settings) => settings[SETTING_NAME];

export const setValue = (settings, value) => {
  settings[SETTING_NAME] = value;
};

export const initializer = async (fileInfo, entityType) => undefined;
export const parser = ({ value }) => fromObject(value);
export const toRawConverter = (setting) => ({
  value: toObject(setting),
});

export {
  createHistory,
  createHistoryFor,
  createHistorySlice,
  fromObject,
  toObject,
  createVersion,
  parseVersionString,
};
