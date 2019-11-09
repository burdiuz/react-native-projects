import { fileHistory } from './settings';

export const writeFile = async (file, content, encoding = undefined) => {
  const history = fileHistory.getValue(file.getSettings());

  await file.write(content, encoding);

  if (history) {
    history.addContent(content);
    await file.flushSettings();
  }

  return file;
};
