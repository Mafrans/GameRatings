import { Type as T } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

const querystring = T.Object({
  sortby: T.Optional(T.Union([T.Literal("title"), T.Literal("rating")])),
  dir: T.Optional(T.Union([T.Literal("asc"), T.Literal("desc")])),
});

const response = {
  "2xx": T.Array(
    T.Object({
      title: T.String(),
      slug: T.String({ pattern: "[a-z0-9-_]+" }),
      rating: T.Number({ minimum: 0, maximum: 10 }),
    })
  ),
};

export const GetGamesSchema: FastifySchema = {
  querystring,
  response,
};

export default GetGamesSchema;
