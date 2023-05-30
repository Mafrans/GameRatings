import { FastifyRequest } from "fastify";

export type GetGameBySlugRequest = FastifyRequest<{
  Params: {
    slug: string;
  };
}>;
