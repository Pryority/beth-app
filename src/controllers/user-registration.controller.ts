// src/controllers/guessController.ts
import { addGuess, getGuesses } from "../db";
import { type GuessRequestBody, type Guess, GuessBody } from "../types/guess";
import { UserRequestBody } from "../types/user";

// export const handleAddGuess = async ({
//   body,
// }: {
//   body: GuessRequestBody;
// }): Promise<Guess> => {
//   const { name, weight, length, bald } = convertToProperTypes(body);
//   const addGuessParams: Guess = { name, weight, length, bald };
//   await addGuess(addGuessParams);
//   return { name, weight, length, bald };
// };

// const convertToProperTypes = (body: GuessRequestBody): Guess => {
//   const { name, weight, length, bald } = body;
//   return {
//     name,
//     weight: parseFloat(weight),
//     length: parseFloat(length),
//     bald: bald.toLowerCase() === "true",
//   };
// };

export const REGISTRATION_ERROR = async () =>
  await Bun.file("./src/views/register/registration-modal.html").text();
