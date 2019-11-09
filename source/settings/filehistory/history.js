import { create as createVersion } from './version';

import { HistorySlice } from './historyslice';

export class History {
  constructor(slices = []) {
    this.slices = slices;
  }

  isEmpty() {
    return this.slices.length < 1;
  }

  get currentSlice() {
    const { slices } = this;

    return slices[slices.length - 1];
  }

  get currentVersion() {
    return this.isEmpty() ? createVersion() : this.currentSlice.version;
  }

  get currentContent() {
    return this.isEmpty() ? undefined : this.currentSlice.content;
  }

  bumpVersion() {
    return this.currentVersion.bump();
  }

  addContent(content, locked = false, version = null) {
    this.slices.push(
      HistorySlice.create(content, version || this.bumpVersion(), locked),
    );
  }

  addSlice(slice) {
    this.slices.push(slice);
  }

  shiftSlice() {
    return this.slices.shift();
  }

  popSlice() {
    return this.slices.pop();
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
