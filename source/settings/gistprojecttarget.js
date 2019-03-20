export const SETTING_NAME = 'gist.project-target';

export const getValue = (settings) => settings[SETTING_NAME];
export const setValue = (settings, value) => {
  settings[SETTING_NAME] = value;
};
export const initializer = () => ({});
export const parser = (setting) => setting || {};
export const toRawConverter = (gist) => gist;
