export class LocalStorage {
  static setItem(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  static getItem(name) {
    return JSON.parse(localStorage.getItem(name));
  }

  static clear(name) {
    localStorage.removeItem(name);
  }
}
