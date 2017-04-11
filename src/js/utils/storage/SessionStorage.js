import { LocalStorage } from './LocalStorage'

export class SessionStorage extends LocalStorage {
  static save(session) {
    this.setItem('session', session);
  }

  static load() {
    return this.getItem('session');
  }

  static remove() {
    this.clear('session');
  }
}
