import FileInfo from './file';
import DirectoryInfo from './directory';
import ProjectInfo from './project';
import { FILE_TYPE, DIRECTORY_TYPE, PROJECT_TYPE } from '../constants';
import { readSettingsFor } from '../fs/settings';
import { getItemType } from '../utils';

/*
    Actually, its a good idea of having projectInfos inside of projectInfos, this gives advantages:
    1. You may publish to Gists small part of bigger projectInfo
    2. You may configure directory in your projectInfo separately,
      for example add tools for specific part(Colors panel for sub-projectInfo), or change demo container.
    3. Possibility to import it into other projectInfos.

    But this case projectInfo must have directory name equal to its name to make imports working.
  */
const projectInfoInfoFactory = async (directory, parentProjectInfo = null) =>
  new ProjectInfo(directory, parentProjectInfo);

const directoryInfoFactory = async (directory, projectInfo = null) =>
  new DirectoryInfo(directory, projectInfo);

const fileInfoFactory = async (file, projectInfo = null) => new FileInfo(file, projectInfo);

export const createInfoItem = async (
  file,
  projectInfo,
  suggestedType = null,
  cacheStorage = null,
) => {
  const type = suggestedType || (await getItemType(file));
  let factory;

  if (cacheStorage) {
    const cachedItem = cacheStorage.get(file.path());

    if (cachedItem && cachedItem.type === type) {
      await cachedItem._settingsPromise;

      cachedItem.resetTarget(file, projectInfo);

      return cachedItem;
    }
  }

  switch (type) {
    case PROJECT_TYPE:
      factory = projectInfoInfoFactory;
      break;
    case DIRECTORY_TYPE:
      factory = directoryInfoFactory;
      break;
    case FILE_TYPE:
      factory = fileInfoFactory;
      break;
    default:
      break;
  }

  const item = await factory(file, projectInfo);
  /*
    The point of doing this is to put item into cache storage as soon as possible.
    But we need to be sure its complete and ready to use item with settings.
    That's why we store this promise to wait for it when item is retrieved
    from cache(code above).
  */
  item._settingsPromise = readSettingsFor(item);

  if (cacheStorage) {
    cacheStorage.set(file.path(), item);
  }

  await item._settingsPromise;

  delete item._settingsPromise;

  return item;
};

export const createInfoItems = async (list, projectInfo = null, cacheStorage = null) => {
  const result = [];
  const total = list.length;

  for (let index = 0; index < total; index++) {
    result[index] = await createInfoItem(list[index], projectInfo, null, cacheStorage);
  }

  return result;
};

export { FileInfo, DirectoryInfo, ProjectInfo };
