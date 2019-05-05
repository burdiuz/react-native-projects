import { fileHistory } from './settings';

export const writeFile = async (file, content, encoding = undefined) => {
  const history = fileHistory.getValue(file.getSettings());

  history.addContent(content);

  await file.write(content, encoding);
  await file.flushSettings();

  return file;
};
