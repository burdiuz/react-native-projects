import { makeBoolSettingApi } from './utils';

const {
  SETTING_NAME,
  getValue,
  setValue,
  initializer,
  parser,
  toRawConverter,
} = makeBoolSettingApi('directory.allowNewFiles', true);

export { SETTING_NAME, getValue, setValue, initializer, parser, toRawConverter };
