import Elysia from "elysia";
import { REGISTRATION_SCHEMA } from "../../types/user";
import { REGISTRATION_ERROR } from "../../controllers/user-registration.controller";
import { db } from "../../db";
import { user } from "../../db/schemas/user";
import { nanoid } from "nanoid";

export const REGISTER__ROUTES = (app: Elysia) => {
  app.group("/register", (api) => {
    api
      .post(
        "/",
        async ({ body: { name, email, password } }) => {
          try {
            if (!name || !email || !password) {
              return REGISTRATION_ERROR;
            }

            const passwordHash = Bun.password.hash(password);
            const newUser = await db.insert(user).values({
              id: nanoid(8),
              name: name,
              email: email,
              password: await passwordHash,
            });

            return `New user: ${newUser}`;
          } catch (error) {
            console.error("Registration error:", error);
            return REGISTRATION_ERROR;
          }
        },
        {
          body: REGISTRATION_SCHEMA,
        }
      )
      .get(
        "/modal",
        async () =>
          await Bun.file("./src/views/register/registration-modal.html").text()
      );

    return api;
  });
};

// .get("/register/:name", async ({ jwt, cookie, setCookie, params }) => {
//   const { name } = params;

//   const existingUser = db
//     .select({})
//     .where(eq(guess.id, id))
//     .returning({ updatedId: guess.id });
//   setCookie("auth", await jwt.sign(params), {
//     httpOnly: true,
//     maxAge: 7 * 86400,
//   });

//   return `Sign in as ${cookie.auth}`;
// })
