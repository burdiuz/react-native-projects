import { fsTarget, gistTarget, pinned } from '../settings';

class Info {
  constructor(fs, project) {
    this.fs = fs;
    this.project = project;
    this.settings = null;
  }

  clone() {
    const next = new this.constructor(this.fs, this.project);
    // FIXME clone settings
    next.applySettings(this.settings);

    return next;
  }

  applySettings(settings) {
    this.settings = settings;
  }

  getSettings() {
    return this.settings;
  }

  get fsSettings() {
    return fsTarget.getValue(this.settings);
  }

  get gistSettings() {
    return gistTarget.getValue(this.settings);
  }

  get pinned() {
    return pinned.getValue(this.settings);
  }

  set pinned(value) {
    return pinned.setValue(this.settings, !!value);
  }

  get path() {
    return this.fs.path();
  }

  get name() {
    return this.fs.name();
  }

  isFile() {
    return this.fs.isFile();
  }

  isDirectory() {
    return this.fs.isDirectory();
  }
}

export default Info;
