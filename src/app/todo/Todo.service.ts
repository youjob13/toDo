import StorageService from "../shared/service/storage";

export default class TodoService {
  private readonly key = "todos";

  constructor(private storage: StorageService) {}

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
