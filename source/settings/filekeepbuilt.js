import { makeBoolSettingApi } from './utils';

const {
  SETTING_NAME,
  getValue,
  setValue,
  initializer,
  parser,
  toRawConverter,
} = makeBoolSettingApi('file.keep-built-exports', true);

/*
  If TRUE, once built exports are kept in memory and being reused.
  FALSE by default for app created files.
*/
export { SETTING_NAME, getValue, setValue, initializer, parser, toRawConverter };
