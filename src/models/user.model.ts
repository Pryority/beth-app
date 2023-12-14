import Elysia, { t } from "elysia";

export const USER_MODEL = new Elysia().model({
  user: t.Object({
    name: t.String(),
    email: t.String(),
    password: t.String(),
  }),
});
