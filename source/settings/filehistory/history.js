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

  pushContent(content, locked = false, version = null, limitTo = 0) {
    this.slices.push(HistorySlice.create(content, version || this.bumpVersion(), locked));

    if (limitTo > 0) {
      this.limitSlicesTo(limitTo);
    }
  }

  pushSlice(slice, limitTo = 0) {
    this.slices.push(slice);

    if (limitTo > 0) {
      this.limitSlicesTo(limitTo);
    }
  }

  limitSlicesTo(limit) {
    let count = 0;

    this.slices = this.slices.reduceRight((list, slice) => {
      if (slice.locked) {
        list.unshift(slice);
      } else if (count < limit) {
        count += 1;
        list.unshift(slice);
      }

      return list;
    }, []);
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
