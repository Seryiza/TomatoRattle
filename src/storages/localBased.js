export default class LocalBasedStorage {
  constructor(defaultStorage) {
    this.storage = localStorage;
    this.defaultStorage = defaultStorage;
  }

  has(key) {
    return this.storage.getItem(key) != null;
  }

  get(key) {
    if (!this.has(key) && this.defaultStorage) {
      return this.defaultStorage.get(key);
    }
    return this.storage.getItem(key);
  }

  set(key, value) {
    this.storage.setItem(key, value);
  }
}
