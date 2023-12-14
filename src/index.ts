// src/index.ts
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { CREATE_LOCAL_DB, db } from "./db";
import { ENVIRONMENT } from "./utils/db-constants";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import { JWT_SECRET } from "./utils/auth-constants";
import staticPlugin from "@elysiajs/static";
import { API } from "./routes/views.route";

const runServer = async (): Promise<void> => {
  const app = new Elysia()
    .use(html())
    .use(staticPlugin())
    .use(
      jwt({
        name: "jwt",
        secret: JWT_SECRET as string,
      })
    )
    .use(cookie())
    .decorate("db", db)
    .use(API(new Elysia()))

    .listen(process.env.PORT ?? 3000);

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
  if (ENVIRONMENT !== "production") CREATE_LOCAL_DB();
  await runServer();
};

void main();
