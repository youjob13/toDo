import { container } from "tsyringe";
import { InjectionToken } from "../common/injectionTokens";

export default class TodoService {
  private readonly key = "todos";
  private readonly storage = container.resolve(InjectionToken.STORAGE);

  public save(todos: string[]): Promise<void> {
    return Promise.resolve(this.storage.setItem(this.key, todos));
  }

  public load(): Promise<string[]> {
    return Promise.resolve(this.storage.getItem(this.key) ?? []);
  }

  public remove(item: string): Promise<void> {
    return Promise.resolve(this.storage.removeItemFromList(this.key, item));
  }
}
