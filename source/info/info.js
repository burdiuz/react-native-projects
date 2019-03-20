import EventDispatcher from '@actualwave/event-dispatcher';
import { fsTarget, gistTarget, pinned, system } from '../settings';
import { writeSettingsFor } from '../fs/settings';

export const INFO_UPDATED_EVENT = 'infoUpdated';
export const INFO_PARENT_UPDATED_EVENT = 'infoUpdated';

let index = 0;

class Info extends EventDispatcher {
  constructor(fs, project) {
    super();

    this.id = ++index;
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

  resetTarget(fs, project) {
    this.fs = fs;
    this.project = project;
  }

  updated() {
    this.dispatchEvent(INFO_UPDATED_EVENT, this);
  }

  parentUpdated() {
    return this.dispatchEvent(INFO_PARENT_UPDATED_EVENT, this);
  }

  addUpdatedListener(callback) {
    return this.addEventListener(INFO_UPDATED_EVENT, callback);
  }

  addParentUpdatedListener(callback) {
    return this.addEventListener(INFO_PARENT_UPDATED_EVENT, callback);
  }

  removeUpdatedListener(callback) {
    return this.removeEventListener(INFO_UPDATED_EVENT, callback);
  }

  removeParentUpdatedListener(callback) {
    return this.removeEventListener(INFO_PARENT_UPDATED_EVENT, callback);
  }

  applySettings(settings) {
    this.settings = settings;
  }

  getSettings() {
    return this.settings;
  }

  flushSettings() {
    return writeSettingsFor(this);
  }

  get fsSettings() {
    return fsTarget.getValue(this.settings);
  }

  get gistSettings() {
    return gistTarget.getValue(this.settings);
  }

  get system() {
    return system.getValue(this.settings);
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
