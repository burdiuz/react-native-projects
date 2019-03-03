import { makeBoolSettingApi } from './utils';

const {
  SETTING_NAME,
  getValue,
  setValue,
  initializer,
  parser,
  toRawConverter,
} = makeBoolSettingApi('system');

export { SETTING_NAME, getValue, setValue, initializer, parser, toRawConverter };
