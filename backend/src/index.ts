import { fastify } from "fastify";
import cors from "@fastify/cors";
import router from "./routes/router";
import dotenv from "dotenv";
import fastifyCookie from "@fastify/cookie";

dotenv.config();
const server = fastify({ logger: process.env.NODE_ENV !== "production" });

// Register plugins
server.register(fastifyCookie, { secret: process.env.COOKIE_SECRET });
server.register(cors);
server.register(router);

server.listen(
  {
    port: 3000,
  },
  (err, addr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Started on ${addr}`);
  }
);
