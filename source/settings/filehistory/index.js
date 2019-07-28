import { createHistoryFor, fromObject, toObject } from './history';
import { FILE_TYPE } from '../../constants';

export const SETTING_NAME = 'file.history';

export const getValue = (settings) => settings[SETTING_NAME];

export const setValue = (settings, value) => {
  settings[SETTING_NAME] = value;
};

export const initializer = async (fileInfo, entityType) => {
  if (entityType !== FILE_TYPE) {
    return undefined;
  }

  try {
    /*
      Variable is needed because otherwise rejected promise will go
      to parent async/await couple. If we want to capture error here,
      we must wait for promsie to reject here.
    */
    const history = await createHistoryFor(fileInfo.fs);
    
    return history;
  } catch (error) {
    // FIXME need better way to handle binary files read() error
    return null;
  }
};
export const parser = ({ value }) => fromObject(value);
export const toRawConverter = (setting) => ({
  value: toObject(setting),
});
