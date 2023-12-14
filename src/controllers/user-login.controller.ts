// src/controllers/guessController.ts
import { addGuess, getGuesses } from "../db";
import { type GuessRequestBody, type Guess, GuessBody } from "../types/guess";
import { UserRequestBody } from "../types/user";

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

export const REGISTRATION_ERROR = async () =>
  await Bun.file("./src/views/register/registration-modal.html").text();

export const renderedProfile = async (
  body: UserRequestBody
): Promise<string> => {
  const { name } = body;

  return `
  <!doctype html>
  <html>
    <head>
      <title>${name} Profile</title>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"
      />
      <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
      <script
        src="https://unpkg.com/htmx.org@1.9.9"
        integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX"
        crossorigin="anonymous"
      ></script>
    </head>

    <body class="container">
      <nav>
        <ul>
          <li style="text-transform: capitalize;"><strong>${name}'s Profile</strong></li>
        </ul>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#">Link</a></li>
          <li><a href="#" role="button">Button</a></li>
        </ul>
      </nav>
      <main class="container">
        <article>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
            nam ipsa quisquam blanditiis eligendi esse iste odio possimus
            obcaecati facere.
          </p>
        </article>
      </main>
    </body>
  </html>
  `;
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
