import { Type as T } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

const querystring = T.Object({
  dir: T.Optional(T.Union([T.Literal("asc"), T.Literal("desc")])),
});

const response = {
  "2xx": T.Array(
    T.Object({
      title: T.String(),
      slug: T.String({ pattern: "[a-z0-9-_]+" }),
    })
  ),
};

export const GetGamesSchema: FastifySchema = {
  querystring,
  response,
};

export default GetGamesSchema;
