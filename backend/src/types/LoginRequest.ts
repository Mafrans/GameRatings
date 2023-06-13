import { FastifyRequest } from "fastify";

export type LoginRequest = FastifyRequest<{
  Body:
    | {
        username: string;
        password: string;
      }
    | {
        email: string;
        password: string;
      };
}>;
