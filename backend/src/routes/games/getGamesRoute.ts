import { FastifyReply } from "fastify";
import { GetGamesRequest } from "../../types/GetGamesRequest";
import {
  getGamesSortedByTitleAscending,
  getGamesSortedByTitleDescending,
} from "../../models/Game";

export async function getGamesRoute(
  request: GetGamesRequest,
  reply: FastifyReply
) {
  const { count = 20, skip = 0, dir = "asc" } = request.query;

  switch (dir) {
    case "asc":
      return getGamesSortedByTitleAscending.all({ limit: count, offset: skip });
    case "desc":
      return getGamesSortedByTitleDescending.all({
        limit: count,
        offset: skip,
      });
  }
}
