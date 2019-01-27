import { FILE_TYPE } from '../constants';
import { fileHistory, fileLock, fileImport } from '../settings';
import Info from './info';

class FileInfo extends Info {
  type = FILE_TYPE;

  get file() {
    return this.fs;
  }

  get history() {
    return fileHistory.getValue(this.settings);
  }

  get locked() {
    return fileLock.getValue(this.settings);
  }

  set locked(value) {
    fileLock.setValue(this.settings, value);
  }

  get importEnabled() {
    const { enabled } = fileImport.getValue(this.settings);
    return enabled;
  }

  get importName() {
    const { importName } = fileImport.getValue(this.settings);
    return importName;
  }

  enableImport(importName, enabled = true) {
    return fileLock.setValue(this.settings, { importName, enabled });
  }

  disableImport() {
    return fileLock.setValue(this.settings, { importName: this.importName, enabled: false });
  }
}

export default FileInfo;
