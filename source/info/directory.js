import { DIRECTORY_TYPE } from '../constants';
import { directoryExpand, allowNewDirectories, allowNewFiles, allowNewProjects } from '../settings';

import Info from './info';

class DirectoryInfo extends Info {
  type = DIRECTORY_TYPE;

  get expanded() {
    return directoryExpand.getValue(this.settings);
  }

  set expanded(value) {
    directoryExpand.setValue(this.settings, !!value);
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  get directory() {
    return this.fs;
  }

  get allowNewDirectories() {
    return allowNewDirectories.getValue(this.settings);
  }

  get allowNewFiles() {
    return allowNewFiles.getValue(this.settings);
  }

  get allowNewProjects() {
    return allowNewProjects.getValue(this.settings);
  }
}

export default DirectoryInfo;
