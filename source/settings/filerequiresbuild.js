import { makeBoolSettingApi } from './utils';

const {
  SETTING_NAME,
  getValue,
  setValue,
  initializer,
  parser,
  toRawConverter,
} = makeBoolSettingApi('file.requires-build-before-run');

/*
 If TRUE, it must be transpilded with babel before running code.
 TRUE by default for all files created in the app.
 */
export { SETTING_NAME, getValue, setValue, initializer, parser, toRawConverter };
