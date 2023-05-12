import { fastify } from "fastify";
import cors from "@fastify/cors";
import router from "./routes/router";
import dotenv from "dotenv";

dotenv.config();
const server = fastify({ logger: process.env.NODE_ENV === "development" });

// Register plugins
server.register(cors);
server.register(router);

server.listen({
  port: 3000,
});
