import { LocalStorage } from './LocalStorage'

export class UserStorage extends LocalStorage {
  static save(user) {
    this.setItem('user', user);
  }

  static load() {
    return this.getItem('user');
  }

  static remove() {
    this.clear('user');
  }
}
