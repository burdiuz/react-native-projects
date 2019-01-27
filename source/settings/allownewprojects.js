import { makeBoolSettingApi } from './utils';

const {
  SETTING_NAME,
  getValue,
  setValue,
  initializer,
  parser,
  toRawConverter,
} = makeBoolSettingApi('directory.allowNewProjects');

export { SETTING_NAME, getValue, setValue, initializer, parser, toRawConverter };
