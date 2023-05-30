import { FastifyReply } from "fastify";
import { GetGameBySlugRequest } from "../../types/GetGameBySlugRequest";
import { getGameBySlug, getGames } from "../../models/Game";

export async function getGameBySlugRoute(
  request: GetGameBySlugRequest,
  reply: FastifyReply
) {
  const { slug } = request.params;
  console.log(getGames.all({ limit: 10, offset: 0 }));
  const game = getGameBySlug.all({ slug });

  if (game == null) {
    reply.statusCode = 404;
    return {
      error: "No such game",
    };
  }

  return game;
}
