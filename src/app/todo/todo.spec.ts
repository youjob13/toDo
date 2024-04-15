import "reflect-metadata";
import { container } from "tsyringe";
import { Todo } from "./Todo";
import { ITodoState, TodoActions } from "./Todo.state";
import Store from "../shared/service/store";
import { InjectionToken } from "../common/injectionTokens";
import { IStorage } from "../shared/models/IStorage";

class MockTodoStore extends Store<ITodoState, TodoActions> {
  public subscribe(callback: (state: ITodoState) => void): void {}
  dispatch() {}
}

class MockStorageService implements IStorage {
  length: number = 0;
  clear(): void {}
  key(index: number): string | null {
    return null;
  }
  setItem<TValue>(key: string, value: TValue): void {}
  getItem<TValue>(key: string): TValue | null {
    return null;
  }
  removeItem(key: string): void {}
  removeItemFromList<T>(key: string, itemToRemove: string): void {}
}

container.register(InjectionToken.TODO_STORE, { useClass: MockTodoStore });
container.register(InjectionToken.STORAGE, { useClass: MockStorageService });

describe("Todo", () => {
  it("should create instance", () => {
    const todo = new Todo();
    expect(todo).toBeTruthy();
  });
});
