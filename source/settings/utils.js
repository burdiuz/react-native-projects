export const makeBoolSettingApi = (name, defaultValue = false) =>
  Object.freeze({
    SETTING_NAME: name,

    getValue: (settings) => settings[name],
    setValue: (settings, value) => {
      settings[name] = !!value;
    },

    initializer: () => defaultValue,
    parser: ({ value }) => !!value,
    toRawConverter: (setting) => ({ value: !!setting }),
  });

  export const makeStringSettingApi = (name, defaultValue = '') =>
  Object.freeze({
    SETTING_NAME: name,

    getValue: (settings) => settings[name],
    setValue: (settings, value) => {
      settings[name] = String(value);
    },

    initializer: () => defaultValue,
    parser: ({ value }) => String(value),
    toRawConverter: (setting) => ({ value: String(setting) }),
  });
