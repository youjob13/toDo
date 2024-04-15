import type { IStorage } from "../models/IStorage";

export default class StorageService implements IStorage {
  public get length(): number {
    return localStorage.length;
  }

  public clear() {
    localStorage.clear();
  }

  public key(index: number): string | null {
    return localStorage.key(index);
  }

  public setItem<TValue>(key: string, value: TValue) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<TValue>(key: string): TValue | null {
    const item = localStorage.getItem(key);

    if (item == null) {
      return null;
    }

    return JSON.parse(item);
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public removeItemFromList<T>(key: string, itemToRemove: string) {
    const filteredList = this.getItem<T[]>(key)?.filter(
      (item) => item !== itemToRemove
    );
    this.setItem(key, filteredList);
  }
}
