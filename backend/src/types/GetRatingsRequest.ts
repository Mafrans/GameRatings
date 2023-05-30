import { FastifyRequest } from "fastify";

export type GetRatingsRequest = FastifyRequest<{
  Querystring: {
    count?: number;
    skip?: number;
  };
}>;
