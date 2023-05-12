import { fastify } from "fastify";
import router from "./routes/router";

const server = fastify({ logger: true });

server.register(router);

server.listen({
  port: 3000,
});
