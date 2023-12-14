// src/index.ts
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { createLocalGuessDB, db } from "./db";
import { guessModel } from "./models/guess.model";
import { setupGuessRoutes } from "./routes/guess.route";
import { ENVIRONMENT } from "./utils/db-constants";

const runServer = async (): Promise<void> => {
  const app = new Elysia()
    .use(html())
    .decorate("db", db)
    .get("/", async () => await Bun.file("./src/index.html").text())
    .use(guessModel);
  setupGuessRoutes(app);
  app.listen(3000);
  console.log(
    `
    🥟\t B - Runtime: bun
    🦊\t E - Server: elysia -- ${app.server?.hostname}:${app.server?.port}
    🐬\t T - Database: turso (sqlite)
    🐴\t H - HTML: htmx
    `
  );
};

const main = async (): Promise<void> => {
  if (ENVIRONMENT !== "production") createLocalGuessDB();
  await runServer();
};

void main();
