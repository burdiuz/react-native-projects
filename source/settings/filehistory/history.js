import { create as createVersion } from './version';

import { HistorySlice } from './historyslice';

export class History {
  constructor(slices = []) {
    this.slices = slices;
  }

  isEmpty() {
    return this.slices.length < 1;
  }

  get currentVersion() {
    const latestIndex = this.slices.length - 1;
    return latestIndex >= 0 ? this.slices[latestIndex].version : createVersion();
  }

  get currentContent() {
    const latestIndex = this.slices.length - 1;
    return latestIndex >= 0 ? this.slices[latestIndex].content : undefined;
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

export const createHistoryFor = async (file) => {
  const content = await file.read();

  return new History([HistorySlice.create(content)]);
};

export const fromObject = (list) => {
  if (!list) return null;

  return createHistory(list.map((obj) => HistorySlice.fromObject(obj)));
};

export const toObject = (history) => {
  if (!history) return null;

  return history.slices.map((slice) => HistorySlice.toObject(slice));
};
