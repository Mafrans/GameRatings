import { FastifyReply, FastifyRequest } from "fastify";
import { getRequestSession } from "../../models/Session";
import { getUserById } from "../../models/User";

export async function meRoute(request: FastifyRequest, reply: FastifyReply) {
  const session = getRequestSession(request);
  const user = getUserById.get({ id: session.userId });

  return user;
}
