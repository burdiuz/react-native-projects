export const SETTING_NAME = 'fs.target';

export const getValue = (settings) => settings[SETTING_NAME];
export const setValue = (settings, value) => {
  settings[SETTING_NAME] = value;
};
export const initializer = (entity, entityType, settingName) => entity.fs;
export const parser = (setting, entity, entityType, settingName) => {
  if (entity.fs) {
    return entity.fs;
  }

  return undefined;
};
export const toRawConverter = (fs, entity, entityType, settingName) => {
  if (fs) {
    /*
      not needed for now, might be used later to determine changes
      in path or modify time.
      will keep it for sake of testing, settings must persist data between
      create-update infinite cycles.
    */
    return {
      path: fs.path(),
      size: fs.size(),
      name: fs.name(),
      isFile: fs.isFile(),
      isDirectory: fs.isDirectory(),
      ctime: fs.ctime(),
      mtime: fs.mtime(),
    };
  }

  return {};
};
