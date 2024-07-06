import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getLocalStorage(key: string) {
    localStorage.getItem(key);
  }

  removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }
}
