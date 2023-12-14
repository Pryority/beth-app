// src/routes/guessRoutes.ts
import Elysia, { t } from "elysia";

export const guessModel = new Elysia().model({
  guess: t.Object({
    name: t.String(),
    weight: t.Number(),
    length: t.Number(),
    bald: t.Boolean(),
  }),
});
