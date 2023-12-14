// src/db/index.ts
import { type Guess } from "../types/guess";
import { drizzle } from "drizzle-orm/libsql";
import { guess } from "./schemas/guess";
import { eq, sql } from "drizzle-orm";
import {
  ENVIRONMENT,
  LOCAL_TURSO_CLIENT,
  REMOTE_TURSO_CLIENT,
} from "../utils/db-constants";

export const db =
  ENVIRONMENT === "production"
    ? drizzle(REMOTE_TURSO_CLIENT)
    : drizzle(LOCAL_TURSO_CLIENT);

export const getGuesses = async (): Promise<Guess[]> => {
  try {
    const guesses: Guess[] = await db.select().from(guess);
    return guesses;
  } catch (error) {
    console.error("Error retrieving guesses:", error);
    throw error;
  }
};

export const addGuess = async ($guess: Guess) => {
  return db.insert(guess).values({
    id: $guess.id,
    name: $guess.name,
    weight: $guess.weight,
    length: $guess.length,
    bald: $guess.bald,
  });
};

export const updateGuess = async (id: number, $guess: Guess) => {
  db.update(guess)
    .set({
      id: $guess.id,
      name: $guess.name,
      weight: $guess.weight,
      length: $guess.length,
      bald: $guess.bald,
    })
    .where(eq(guess.id, id))
    .returning({ updatedId: guess.id });
};

export const deleteGuess = async (id: number) => {
  db.delete(guess).where(eq(guess.id, id));
};

export const createLocalGuessDB = async () => {
  await db.run(
    sql`CREATE TABLE IF NOT EXISTS guess (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, weight INTEGER, length INTEGER, bald BOOLEAN)`
  );
};
