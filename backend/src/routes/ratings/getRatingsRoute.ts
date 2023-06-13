import { FastifyReply } from "fastify";
import { GetRatingsRequest } from "../../types/GetRatingsRequest";
import { getRatings } from "../../models/Rating";

export async function getRatingsRoute(
  request: GetRatingsRequest,
  reply: FastifyReply
) {
  const { count = 20, skip = 0 } = request.query;

  return getRatings.all({ limit: count, offset: skip });
}
