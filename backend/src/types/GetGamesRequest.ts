import { FastifyRequest } from "fastify";

export type GetGamesRequest = FastifyRequest<{
  Querystring: {
    count?: number;
    skip?: number;
    dir?: "asc" | "desc";
  };
}>;
