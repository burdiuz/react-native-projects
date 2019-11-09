import Version, {
  create as createVersion,
  toObject as versionToObject,
  fromObject as versionFromObject,
} from './version';

export class HistorySlice {
  constructor(
    content = '',
    version = createVersion(),
    locked = false,
    timestampArg = undefined,
  ) {
    this.locked = locked;
    const timestamp = timestampArg || Date.now();

    Object.assign(this, {
      get content() {
        return content;
      },
      get version() {
        return version;
      },
      get timestamp() {
        return timestamp;
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

  static create(content, version, locked, timestamp = undefined) {
    return new HistorySlice(content, version, locked, timestamp);
  }

  static toObject({ content, version, locked, timestamp = undefined }) {
    return { content, version: versionToObject(version), locked, timestamp };
  }

  static fromObject({ content, version, locked, timestamp = undefined }) {
    const versionImpl = versionFromObject(version);

    return new HistorySlice(content, versionImpl, locked, timestamp);
  }
}

export const createHistorySlice = (
  content,
  version,
  locked,
  timestamp = undefined,
) => HistorySlice.create(content, version, locked, timestamp);
