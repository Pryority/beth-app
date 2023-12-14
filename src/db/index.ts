// src/db/index.ts
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";
import {
  ENVIRONMENT,
  LOCAL_TURSO_CLIENT,
  REMOTE_TURSO_CLIENT,
} from "../utils/db-constants";

export const db =
  ENVIRONMENT === "production"
    ? drizzle(REMOTE_TURSO_CLIENT)
    : drizzle(LOCAL_TURSO_CLIENT);

export const CREATE_LOCAL_DB = async () => {
  await db.run(
    sql`CREATE TABLE IF NOT EXISTS user (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT,
      password TEXT,
      weight INTEGER
    );
    `
  );
};
