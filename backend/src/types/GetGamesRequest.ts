import { FastifyRequest } from "fastify";

export type GetGamesRequest = FastifyRequest<{
  Querystring: {
    count?: number;
    skip?: number;
    sortby?: "title" | "rating";
    dir?: "asc" | "desc";
  };
}>;
