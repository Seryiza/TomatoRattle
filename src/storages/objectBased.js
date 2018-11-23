// TODO: Write unit-tests

export default class ObjectBasedStorage {
  constructor(object, defaultStorage) {
    this.storage = new Map(Object.entries(object));
    this.defaultStorage = defaultStorage;
  }

  has(key) {
    return this.storage.has(key);
  }

  get(key) {
    if (!this.has(key) && this.defaultStorage) {
      return this.defaultStorage.get(key);
    }
    return this.storage.get(key);
  }

  set(key, value) {
    this.storage.set(key, value);
  }
}
