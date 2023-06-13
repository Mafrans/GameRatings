import { FastifyRequest } from "fastify";

export type RegisterUserRequest = FastifyRequest<{
  Body: {
    username: string;
    email: string;
    password: string;
  };
}>;
