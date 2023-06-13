import { Type as T } from "@sinclair/typebox";
import { FastifySchema } from "fastify";
import { emailRegex, usernameRegex } from "../util/regex";

const response = {
  "2xx": T.Object({
    username: T.String({
      pattern: usernameRegex.source,
    }),
    email: T.String({
      pattern: emailRegex.source,
    }),
  }),
};

export const MeSchema: FastifySchema = {
  response,
};

export default MeSchema;
