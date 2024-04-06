import App from "./app/app";
import Router from "./app/shared/service/router";
import StorageService from "./app/shared/service/storage";

const storage = new StorageService();
const router = new Router();

new App(storage, router);
