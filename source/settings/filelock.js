import { makeBoolSettingApi } from './utils';

const {
  SETTING_NAME,
  getValue,
  setValue,
  initializer,
  parser,
  toRawConverter,
} = makeBoolSettingApi('file.lock');

export { SETTING_NAME, getValue, setValue, initializer, parser, toRawConverter };
