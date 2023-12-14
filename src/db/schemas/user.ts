import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").unique().notNull(),
  name: text("name").notNull(),
  email: text("weight").unique().notNull(),
  password: text("length").notNull(),
});
