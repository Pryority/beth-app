import { t } from "elysia";

/** NOTE: RBS => Request Body Schema */

export interface Guess {
  id?: number;
  name: string;
  weight: number;
  length: number;
  bald: boolean;
}
export interface GuessBody {
  id?: number;
  name: string;
  weight: string;
  length: string;
  bald: string;
}

export const guessRBS = t.Object({
  name: t.String(),
  weight: t.String(),
  length: t.String(),
  bald: t.String(),
});

export type GuessRequestBody = (typeof guessRBS)["static"];
