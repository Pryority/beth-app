import Elysia from "elysia";
import { REGISTRATION_SCHEMA } from "../../types/user";
import { REGISTRATION_ERROR } from "../../controllers/user-registration.controller";

export const LOGIN_ROUTES = (app: Elysia) => {
  app.group("/login", (api) => {
    api.get(
      "/",
      async () => await Bun.file("./src/views/login/login.html").text()
    );
    api.post(
      "/",
      async ({ body: { name, email, password } }) => {
        try {
        } catch (error) {
          // TODO: return LOGIN_ERROR
          return REGISTRATION_ERROR;
        }
      },
      {
        // TODO: update to LOGIN_SCHEMA
        body: REGISTRATION_SCHEMA,
      }
    );
    return app;
  });
};
