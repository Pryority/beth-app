import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const session = sqliteTable("session", {
  uuid: integer("uuid", { mode: "number" }).unique(),
  userid: integer("userid", { mode: "number" }).notNull(),
  weight: integer("weight").notNull(),
  length: integer("length").notNull(),
  bald: integer("bald", { mode: "boolean" }).notNull(),
});
