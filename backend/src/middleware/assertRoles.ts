import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from "fastify";
import { checkSessionExpired, getRequestSession } from "../models/Session";
import { getUserById } from "../models/User";
import { Role } from "../types/Role";

// assertRoles takes a list of roles and generates a preHandler function
// which asserts that the user is logged in and has one of the roles.
// It returns 403 if they don't.
export const assertRoles =
  (roles: Role[]) =>
  (
    request: FastifyRequest,
    reply: FastifyReply,
    done: DoneFuncWithErrOrRes
  ) => {
    const session = getRequestSession(request);
    console.log(session);
    if (session == null) {
      reply.statusCode = 401;
      throw new Error("Not logged in");
    }

    if (checkSessionExpired(session)) {
      reply.statusCode = 401;
      throw new Error("Your session has expired, please log in again.");
    }

    const user = getUserById.get({ id: session.userId });
    if (!roles.includes(user.role as Role)) {
      reply.statusCode = 403;
      throw new Error("Forbidden");
    }

    done();
  };
