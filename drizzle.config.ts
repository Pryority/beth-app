import { type Config } from "drizzle-kit";
import { DATABASE_TOKEN, DATABASE_URL } from "./src/utils/db-constants";

export default {
  driver: "turso",
  schema: "./src/db/schemas/guess.ts",
  out: "./drizzle",
  dbCredentials: {
    url: DATABASE_URL,
    authToken: DATABASE_TOKEN,
  },
} satisfies Config;
