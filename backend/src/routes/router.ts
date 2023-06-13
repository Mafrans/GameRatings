import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginCallback,
  FastifyReply,
} from "fastify";
import { getGamesRoute } from "./games/getGamesRoute";
import GetGamesSchema from "../schemas/GetGamesSchema";
import GetRatingsSchema from "../schemas/GetRatingsSchema";
import { getRatingsRoute } from "./ratings/getRatingsRoute";
import GetGameBySlugSchema from "../schemas/GetGameBySlugSchema";
import { getGameBySlugRoute } from "./games/getGameBySlugRoute";
import RegisterUserSchema from "../schemas/RegisterUserSchema";
import { registerUserRoute } from "./users/registerUserRoute";
import LoginSchema from "../schemas/LoginSchema";
import { loginRoute } from "./users/loginRoute";
import { assertRoles } from "../middleware/assertRoles";
import { Role } from "../types/Role";
import MeSchema from "../schemas/MeSchema";
import { meRoute } from "./users/meRoute";

const router: FastifyPluginCallback = (
  fastify: FastifyInstance,
  reply: FastifyReply,
  done
) => {
  fastify.get("/games", {
    schema: GetGamesSchema,
    handler: getGamesRoute,
  });

  fastify.get("/games/:slug", {
    schema: GetGameBySlugSchema,
    handler: getGameBySlugRoute,
  });

  fastify.get("/ratings", {
    schema: GetRatingsSchema,
    handler: getRatingsRoute,
  });

  fastify.post("/users/login", {
    schema: LoginSchema,
    handler: loginRoute,
  });

  fastify.post("/users/register", {
    schema: RegisterUserSchema,
    handler: registerUserRoute,
  });

  fastify.get("/users/me", {
    schema: MeSchema,
    handler: meRoute,
    preHandler: assertRoles([Role.User, Role.Admin]),
  });

  done();
};

export default router;
