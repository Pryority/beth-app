// src/routes/guessRoutes.ts
import { type Elysia } from "elysia";
import {
  renderedGuessTable,
  handleGetGuesses,
  newRenderedGuessTable,
} from "../controllers/guess.controller";
import { guessRBS } from "../types/guess";

export const setupGuessRoutes = (app: Elysia) => {
  app.group("/guess", (guessGroup) => {
    guessGroup.post(
      "/",
      async ({ body: { name, weight, length, bald }, set }) => {
        const newGuess = { name, weight, length, bald };
        return newRenderedGuessTable(newGuess);
      },
      {
        body: guessRBS,
      }
    );
    guessGroup.get("/", async () => {
      return await handleGetGuesses();
    });
    guessGroup.get("/table", async () => {
      return await renderedGuessTable();
    });

    return guessGroup;
  });
};
