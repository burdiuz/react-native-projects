import Version, { create as createVersion } from './version';

import { HistorySlice } from './historyslice';

export class History {
  constructor(slices = []) {
    this.slices = slices;
  }

  get latestVersion() {
    const latestIndex = this.slices.length - 1;
    return latestIndex >= 0 ? this.slices[latestIndex].version : createVersion();
  }

  bumpVersion() {
    return this.version.bump();
  }

  addContent(content, locked = false, version = null) {
    this.slices.push(HistorySlice.create(content, version || this.bumpVersion(), locked));
  }

  addSlice(slice) {
    this.slices.push(slice);
  }
}

export const createHistory = (slices) => new History(slices);

export const fromObject = async (list) => {
  if (!list) return createHistory();

  return createHistory(list.map((obj) => HistorySlice.fromObject(obj)));
};

export const toObject = async (history) => {
  if (!history) return [];

  return history.slices.map((slice) => HistorySlice.toObject(slice));
};
