import { FastifyInstance, FastifyPluginAsync } from "fastify";
import getHelloWorld from "./helloworld/getHelloWorld";

const router: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get("/helloworld", getHelloWorld);
};

export default router;
