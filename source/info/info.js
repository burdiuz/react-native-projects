import EventDispatcher from '@actualwave/event-dispatcher';
import { fsTarget, gistTarget, pinned } from '../settings';

export const INFO_UPDATE_EVENT = 'infoUpdate';

class Info extends EventDispatcher {
  constructor(fs, project) {
    this.fs = fs;
    this.project = project;
    this.settings = null;
  }

  clone() {
    const next = new this.constructor(this.fs, this.project);
    // FIXME should we also clone settings?
    next.applySettings(this.settings);

    return next;
  }

  update(fs, project) {
    this.fs = fs;
    this.project = project;
    this.dispatchEvent(INFO_UPDATE_EVENT, this);
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
