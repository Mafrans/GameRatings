import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { getGamesRoute } from "./games/getGamesRoute";
import GetGamesSchema from "../schemas/GetGamesSchema";

const router: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get("/games", {
    schema: GetGamesSchema,
    handler: getGamesRoute,
  });
};

export default router;
