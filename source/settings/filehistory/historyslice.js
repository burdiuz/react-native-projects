import Version, {
  create as createVersion,
  toObject as versionToObject,
  fromObject as versionFromObject,
} from './version';

export class HistorySlice {
  constructor(content = '', version = createVersion(), locked = false) {
    this.locked = locked;

    Object.assign(this, {
      get content() {
        return content;
      },
      get version() {
        return version;
      },
    });
  }

  [Symbol.toPrimitive]() {
    return this.toString();
  }

  [Symbol.toStringTag]() {
    return `HistorySlice(length=${
      this.content.length
    }, version=${this.version.toString()}, locked=${this.locked})`;
  }

  toString() {
    return JSON.stringify(HistorySlice.toObject(this), null, 2);
  }

  static create(content, version, locked) {
    return new HistorySlice(content, version, locked);
  }

  static toObject({ content, version, locked }) {
    return { content, version: versionToObject(version), locked };
  }

  static fromObject({ content, version, locked }) {
    const versionImpl = versionFromObject(version);

    return new HistorySlice(content, versionImpl, locked);
  }
}

export const createHistorySlice = (content, version, locked) =>
  HistorySlice.create(content, version, locked);
