import { Type as T } from "@sinclair/typebox";
import { FastifySchema } from "fastify";
import { emailRegex, usernameRegex } from "../util/regex";

const body = T.Union([
  T.Object({
    username: T.String({
      pattern: usernameRegex.source,
    }),
    password: T.String(),
  }),

  T.Object({
    email: T.String({
      pattern: emailRegex.source,
    }),
    password: T.String(),
  }),
]);

const response = {
  "2xx": T.Object({
    token: T.String({
      pattern: "[a-f0-9]+",
    }),
  }),
  "401": T.Object({
    error: T.String(),
  }),
};

export const LoginSchema: FastifySchema = {
  body,
  response,
};

export default LoginSchema;
