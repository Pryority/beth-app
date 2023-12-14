import { createClient } from "@libsql/client";

export const DATABASE_URL = process.env.DB_URL!;
export const DATABASE_TOKEN = process.env.DB_TOKEN;
export const ENVIRONMENT = process.env.NODE_ENV;

export const REMOTE_TURSO_CLIENT = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_TOKEN,
});

export const LOCAL_TURSO_CLIENT = createClient({
  url: "http://127.0.0.1:8080",
  authToken: "token",
});
