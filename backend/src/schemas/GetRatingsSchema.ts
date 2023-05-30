import { Type as T } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

const querystring = T.Object({
  dir: T.Optional(T.Union([T.Literal("asc"), T.Literal("desc")])),
});

const response = undefined;

export const GetRatingsSchema: FastifySchema = {
  querystring,
  response,
};

export default GetRatingsSchema;
