import { FastifyReply } from "fastify";
import { GetGamesRequest } from "../../types/GetGamesRequest";
import {
  Game,
  getGames,
  getGamesSortedByRating,
  getGamesSortedByTitle,
} from "../../models/Game";

export async function getGamesRoute(
  request: GetGamesRequest,
  reply: FastifyReply
) {
  const { count = 20, skip = 0, sortby, dir = "asc" } = request.query;

  let games: Game[] = [];
  switch (sortby) {
    case "title":
      games = await getGamesSortedByTitle(dir, {
        "@limit": count,
        "@offset": skip,
      });
      break;

    case "rating":
      games = await getGamesSortedByRating(dir, {
        "@limit": count,
        "@offset": skip,
      });
      break;

    default:
      games = await getGames({
        "@limit": count,
        "@offset": skip,
      });
      break;
  }

  return games;
}
