import "reflect-metadata";
import { container } from "tsyringe";
import App from "./app/app";
import Router from "./app/shared/service/router";
import InMemoryStorageService from "./app/shared/service/inMemoryStorage";
import TodoStore from "./app/todo/Todo.state";
import { InjectionToken } from "./app/common/injectionTokens";

// < --------------------------------------
// так делать не нужно, нужно управлять зависимостями в отдельном файле
container.register(InjectionToken.STORAGE, {
  useClass: InMemoryStorageService,
});

container.register(InjectionToken.TODO_STORE, {
  useClass: TodoStore,
});

container.register(InjectionToken.CONFIG, {
  useValue: {
    api: "http://localhost:3000",
  },
});
// -------------------------------------- >

const router = new Router();

new App(router);
