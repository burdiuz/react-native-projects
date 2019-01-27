export const SETTING_NAME = 'file.import';

/*
  Every single file could be enabled to be imported into any project.
  To import file it should be imported using its import name.
  UI must display alert in case of name collision and not allow creating import
  name if same name used for other file. For internal library its allowed, but
  alert and console warning on every start must be shown.
*/
export const getValue = (settings) => settings[SETTING_NAME];

export const setValue = (settings, importName, enabled) => {
  settings[SETTING_NAME] = {
    importName: importName ? String(importName) : '',
    enabled: !!enabled,
  };
};
export const initializer = () => ({
  enabled: false,
  importName: '',
});

export const parser = ({ enabled, importName }) => ({
  enabled,
  importName,
});

export const toRawConverter = ({ enabled, importName }) => ({
  enabled,
  importName,
});
