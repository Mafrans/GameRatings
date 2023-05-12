import { FastifyReply, FastifyRequest } from "fastify";

type GetHelloWorldQuery = {
  name: string;
};

type GetHelloWorldRequest = FastifyRequest<{
  Querystring: GetHelloWorldQuery;
}>;

export default function getHelloWorld(
  request: GetHelloWorldRequest,
  reply: FastifyReply
) {
  const { name } = request.query;
  return { text: `Hello ${name ?? "World"}!` };
}
