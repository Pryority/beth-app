import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const guess = sqliteTable("guess", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  weight: integer("weight").notNull(),
  length: integer("length").notNull(),
  bald: integer("bald", { mode: "boolean" }).notNull(),
});
