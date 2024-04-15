export interface IStorage {
  length: number;
  clear(): void;
  key(index: number): string | null;
  setItem<TValue>(key: string, value: TValue): void;
  getItem<TValue>(key: string): TValue | null;
  removeItem(key: string): void;
  removeItemFromList<T>(key: string, itemToRemove: string): void;
}
