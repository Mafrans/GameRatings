import { FastifyReply } from "fastify";
import { getUserByUsername, getUserByEmail } from "../../models/User";
import { LoginRequest } from "../../types/LoginRequest";

export async function loginRoute(request: LoginRequest, reply: FastifyReply) {
  if ("email" in request.body) {
    return loginWithEmail(request, reply);
  } else if ("username" in request.body) {
    return loginWithUsername(request, reply);
  }
}

function loginWithEmail(request: LoginRequest, reply: FastifyReply) {
  if (!("email" in request.body)) {
    reply.statusCode = 400;
    throw new Error(
      "'body.email' is required when logging in with an email address."
    );
  }

  const { email, password } = request.body;
  const user = getUserByEmail.get({ email });
  if (user == null) {
    reply.statusCode = 401;
    throw new Error("Username or password is invalid.");
  }

  // TODO: create user session
}

function loginWithUsername(request: LoginRequest, reply: FastifyReply) {
  if (!("username" in request.body)) {
    reply.statusCode = 400;
    throw new Error(
      "'body.email' is required when logging in with an email address."
    );
  }

  const { username, password } = request.body;
  const user = getUserByUsername.get({ username });
  if (user == null) {
    reply.statusCode = 401;
    throw new Error("Username or password is invalid.");
  }

  // TODO: create user session
}
