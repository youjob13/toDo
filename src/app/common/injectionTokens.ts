import { InjectionToken as InjectionTokenType } from "tsyringe";
import { ITodoState, TodoActions } from "../todo/Todo.state";
import Store from "../shared/service/store";
import { IStorage } from "../shared/models/IStorage";

// если посмотреть на импорты, можно заметить, что доменная логика приложения импортируется в common директорию
// так делать не нужно, так как common директория должна содержать только общие для всего приложения вещи
// и в будущем это может создать циклические зависимости
export namespace InjectionToken {
  export const STORAGE: InjectionTokenType<IStorage> = Symbol("STORAGE");
  export const TODO_STORE: InjectionTokenType<Store<ITodoState, TodoActions>> =
    Symbol("TODO_STORE");
  export const CONFIG: InjectionTokenType = Symbol("CONFIG");
}
