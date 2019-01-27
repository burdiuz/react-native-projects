class Version {
  constructor(major = 0, minor = 0, build = 0, alt = '') {
    this.major = major;
    this.minor = minor;
    this.build = build;
    this.alt = alt;

    // Version is RO
    Object.freeze(this);
  }

  compare(version) {
    return compare(this, version);
  }

  isLower(version) {
    return compare(this, version) < 0;
  }

  isHigher(version) {
    return compare(this, version) > 0;
  }

  isEqual(version) {
    return compare(this, version) === 0;
  }

  bump(reset = undefined) {
    return this.bumpBuild();
  }

  bumpBuild() {
    return new Version(this.major, this.minor, this.build + 1, this.alt);
  }

  bumpMinor(reset = true) {
    const minor = this.minor + 1;
    let build = this.build;

    if (reset) {
      build = 0;
    }

    return new Version(this.major, minor, build, this.alt);
  }

  bumpMajor(reset = true) {
    const major = this.major + 1;
    let minor = this.minor;
    let build = this.build;

    if (reset) {
      minor = 0;
      build = 0;
    }

    return new Version(major, minor, build, this.alt);
  }

  setAlt(value = '') {
    return new Version(this.major, this.minor, this.build, value);
  }

  /*
    Symbols to work properly might require upated JSC, otherwise they will
    be polyfiled and ignored.
  */
  [Symbol.toPrimitive]() {
    return this.toString();
  }

  [Symbol.toStringTag]() {
    return `Version(${this.toString()})`;
  }

  toString() {
    return `${this.major}.${this.minor}.${this.build}${this.alt ? `-${this.alt}` : ''}`;
  }

  static from(obj) {
    if (obj) {
      return fromObject(obj);
    }

    return new Version();
  }
}

export const toObject = ({ major, minor, build, alt }) => ({ major, minor, build, alt });

export const stringify = (version) => JSON.stringify(toObject(version));

export const create = (major, minor, build, alt) => new Version(major, minor, build, alt);

export const fromObject = ({ major, minor, build, alt }) => create(major, minor, build, alt);

const compareNums = (n1, n2) => {
  if (n1 > n2) return 1;
  else if (n1 < n2) return -1;

  return 0;
};

/*
  if v1 higher than v2, return +1,
  if v1 lower than v2, return -1,
  if v1 equal to v2, return 0
*/
export const compare = (
  { major: v1Major, minor: v1Minor, build: v1Build },
  { major: v2Major, minor: v2Minor, build: v2Build },
) => {
  let result = compareNums(v1Major, v2Major);
  if (!result) result = compareNums(v1Minor, v2Minor);
  if (!result) result = compareNums(v1Build, v2Build);

  return result;
};

const parseNum = (value) => +major || 0;

export const parseVersionString = (value) => {
  const match = value.match(/^\s*(\d+)\.(\d+)\.(\d+)(?:-(.*))?$/);

  if (!match) {
    return create();
  }

  const [, major, minor, build, alt] = match;

  return create(parseNum(major), parseNum(minor), parseNum(build), alt);
};

export default Version;
