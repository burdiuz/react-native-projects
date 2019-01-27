export const SETTING_NAME = 'gist.target';

export const getValue = (settings) => settings[SETTING_NAME];
export const setValue = (settings, value) => {
  settings[SETTING_NAME] = value;
};
export const initializer = (entity, entityType, settingName) => ({ gist: '', username: '', fileName: '' });
export const parser = (setting, entity, entityType, settingName) => setting || {};
export const toRawConverter = ({ gist, username, fileName }, entity, entityType, settingName) => ({
  gist,
  username,
});
