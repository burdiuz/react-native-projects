export const SETTING_NAME = 'project.name';

export const getValue = (settings) => settings[SETTING_NAME];
export const setValue = (settings, value) => {
  settings[SETTING_NAME] = value;
};
export const initializer = (entity) => entity.fs.name();
export const parser = ({ value }, entity) => value || initializer(entity);
export const toRawConverter = (setting) => ({ value: setting });
