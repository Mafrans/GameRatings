import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { getGamesRoute } from "./games/getGamesRoute";

const router: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get("/games", getGamesRoute);
};

export default router;
