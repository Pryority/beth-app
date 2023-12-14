// src/controllers/guessController.ts
import { addGuess, getGuesses } from "../db";
import { type GuessRequestBody, type Guess, GuessBody } from "../types/guess";

export const handleAddGuess = async ({
  body,
}: {
  body: GuessRequestBody;
}): Promise<Guess> => {
  const { name, weight, length, bald } = convertToProperTypes(body);
  const addGuessParams: Guess = { name, weight, length, bald };
  await addGuess(addGuessParams);
  return { name, weight, length, bald };
};

const convertToProperTypes = (body: GuessRequestBody): Guess => {
  const { name, weight, length, bald } = body;
  return {
    name,
    weight: parseFloat(weight),
    length: parseFloat(length),
    bald: bald.toLowerCase() === "true",
  };
};

export const handleGetGuesses = async (): Promise<Guess[]> => {
  return await getGuesses();
};

export const renderedGuessTable = async (): Promise<string> => {
  const guesses = await getGuesses();
  const tableHTML = generateGuessTableHTML(guesses);
  return tableHTML;
};

export const newRenderedGuessTable = async (
  newGuess: GuessBody
): Promise<string> => {
  const formattedGuess = {
    name: newGuess.name,
    weight: parseFloat(newGuess.weight),
    length: parseFloat(newGuess.length),
    bald: newGuess.bald === "true",
  };
  addGuess(formattedGuess);
  const guesses = await getGuesses();
  const updatedGuessList = [...guesses, formattedGuess];
  const tableHTML = generateGuessTableHTML(updatedGuessList);
  return tableHTML;
};

const generateGuessTableHTML = (guesses: Guess[]): string => {
  return `
    ${guesses
      .reverse()
      .map((guess) => generateGuessTableRowHTML(guess))
      .join("")}
  `;
};

const generateGuessTableRowHTML = (guess: Guess): string => {
  return `
    <tr>
      <td>${guess.name}</td>
      <td>${guess.weight}</td>
      <td>${guess.length}</td>
      <td>${guess.bald}</td>
    </tr>
  `;
};
