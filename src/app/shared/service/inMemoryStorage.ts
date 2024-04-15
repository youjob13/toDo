import { IStorage } from "../models/IStorage";

const storage: Record<string, any> = {};

export default class InMemoryStorageService implements IStorage {
  public get length(): number {
    return Object.keys(storage).length;
  }

  public clear() {
    for (const key in storage) {
      delete storage[key];
    }
  }

  public key(index: number): string | null {
    return storage.key(index);
  }

  public setItem<TValue>(key: string, value: TValue) {
    storage[key] = value;
  }

  public getItem<TValue>(key: string): TValue | null {
    return storage[key];
  }

  public removeItem(key: string) {
    delete storage[key];
  }

  public removeItemFromList<T>(key: string, itemToRemove: string) {
    storage[key] = storage[key].filter((item: string) => item !== itemToRemove);
  }
}
