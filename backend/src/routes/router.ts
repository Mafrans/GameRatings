import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { getGamesRoute } from "./games/getGamesRoute";
import GetGamesSchema from "../schemas/GetGamesSchema";
import GetRatingsSchema from "../schemas/GetRatingsSchema";
import { getRatingsRoute } from "./ratings/getRatings";
import GetGameBySlugSchema from "../schemas/GetGameBySlugSchema";
import { getGameBySlugRoute } from "./games/getGameBySlugRoute";

const router: FastifyPluginAsync = async (fastify: FastifyInstance) => {
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
};

export default router;
