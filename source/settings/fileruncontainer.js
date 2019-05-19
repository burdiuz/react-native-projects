import { makeStringSettingApi } from './utils';

const {
  SETTING_NAME,
  getValue,
  setValue,
  initializer,
  parser,
  toRawConverter,
} = makeStringSettingApi('file.run-internal-container');

/*
 If TRUE, it must be transpilded with babel before running code.
 TRUE by default for all files created in the app.
 */
export { SETTING_NAME, getValue, setValue, initializer, parser, toRawConverter };
