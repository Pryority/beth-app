import { t } from "elysia";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export const REGISTRATION_SCHEMA = t.Object({
  name: t.String(),
  email: t.String(),
  password: t.String(),
});

export type UserRequestBody = (typeof REGISTRATION_SCHEMA)["static"];
