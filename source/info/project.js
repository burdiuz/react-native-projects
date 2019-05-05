import { projectName, gistProjectTarget } from '../settings';

import DirectoryInfo from './directory';
import { PROJECT_TYPE } from '../constants';

class ProjectInfo extends DirectoryInfo {
  type = PROJECT_TYPE;

  get directoryName() {
    return super.name;
  }

  get name() {
    return projectName.getValue(this.settings);
  }

  set name(value) {
    if (!this.settings) return;

    projectName.setValue(this.settings, value);
  }

  get gistSettings() {
    return gistProjectTarget.getValue(this.settings);
  }
}

export default ProjectInfo;
