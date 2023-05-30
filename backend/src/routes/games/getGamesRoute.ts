import { FastifyReply } from "fastify";
import { GetGamesRequest } from "../../types/GetGamesRequest";
import { Game, getGames, getGamesSortedByTitle } from "../../models/Game";

export async function getGamesRoute(
  request: GetGamesRequest,
  reply: FastifyReply
) {
  const { count = 20, skip = 0, dir = "asc" } = request.query;

  return await getGamesSortedByTitle(dir, {
    "@limit": count,
    "@offset": skip,
  });
}
