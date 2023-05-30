import { Type as T } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

const params = T.Object({
  slug: T.String({ pattern: "[a-z0-9-_]+" }),
});

const response = {
  "2xx": T.Object({
    title: T.String(),
    slug: T.String({ pattern: "[a-z0-9-_]+" }),
  }),
  "400": T.Object({
    error: T.String(),
  }),
};

export const GetGameBySlugSchema: FastifySchema = {
  params,
  response,
};

export default GetGameBySlugSchema;
