import { fileHistory } from './settings';

export const writeFile = async (file, content, encoding = undefined, limitHistoryTo = 0) => {
  const history = fileHistory.getValue(file.getSettings());

  await file.write(content, encoding);

  if (history) {
    // setting undefined for argument values allows me to not repeat default values
    history.pushContent(content, undefined, undefined, limitHistoryTo);
    await file.flushSettings();
  }

  return file;
};
