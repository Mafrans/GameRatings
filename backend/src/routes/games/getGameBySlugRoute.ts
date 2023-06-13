import { FastifyReply } from "fastify";
import { GetGameBySlugRequest } from "../../types/GetGameBySlugRequest";
import { getGameBySlug, getGames } from "../../models/Game";

export async function getGameBySlugRoute(
  request: GetGameBySlugRequest,
  reply: FastifyReply
) {
  const { slug } = request.params;
  const game = getGameBySlug.get({ slug });

  if (game == null) {
    reply.statusCode = 404;
    throw new Error("No game exists with that slug");
  }

  return game;
}
