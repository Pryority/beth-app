// src/routes/guessRoutes.ts
import { type Elysia } from "elysia";
import { LOGIN_ROUTES } from "./login";
import { REGISTER__ROUTES } from "./register";

export const API = (app: Elysia) => {
  app.group("/", (api) => {
    api.get("/", async () => await Bun.file("./src/index.html").text());
    LOGIN_ROUTES(app);
    REGISTER__ROUTES(app);
    return api;
  });

  return app;
};
