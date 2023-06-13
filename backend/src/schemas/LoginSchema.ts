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

export const LoginSchema: FastifySchema = {
  body,
};

export default LoginSchema;
