import { Type as T } from "@sinclair/typebox";
import { FastifySchema } from "fastify";
import { emailRegex, usernameRegex } from "../util/regex";

const body = T.Object({
  username: T.String({
    pattern: usernameRegex.source,
  }),
  email: T.String({
    pattern: emailRegex.source,
  }),
  password: T.String(),
});

export const RegisterUserSchema: FastifySchema = {
  body,
};

export default RegisterUserSchema;
