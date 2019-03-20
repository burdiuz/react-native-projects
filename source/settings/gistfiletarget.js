export const SETTING_NAME = 'gist.file-target';

export const getValue = (settings) => settings[SETTING_NAME];
export const setValue = (settings, value) => {
  settings[SETTING_NAME] = value;
};
export const initializer = () => ({
  gistId: '',
  owner: '',
  filename: '',
  type: '',
  language: '',
  size: 0,
});
export const parser = (setting) => setting || {};
export const toRawConverter = ({ gistId, owner, filename, type, language, size }) => ({
  gistId,
  owner,
  filename,
  type,
  language,
  size,
});
