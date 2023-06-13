import { FastifyReply } from "fastify";
import { RegisterUserRequest } from "../../types/RegisterUserRequest";
import {
  createUser,
  getUserByUsername,
  getUserByEmail,
  hashPassword,
} from "../../models/User";
import { Role } from "../../types/Role";

export async function registerUserRoute(
  request: RegisterUserRequest,
  reply: FastifyReply
) {
  const { username, email, password } = request.body;

  if (checkUsernameTaken(username)) {
    reply.statusCode = 400;
    throw Error("A user with that username already exists");
  }

  if (checkEmailTaken(email)) {
    reply.statusCode = 400;
    throw Error("A user with that email already exists");
  }

  createUser.run({
    email,
    username,
    password: await hashPassword(password),
    role: Role.User,
  });
}

function checkUsernameTaken(username: string) {
  const user = getUserByUsername.get({ username });
  return user != null;
}

function checkEmailTaken(email: string) {
  const user = getUserByEmail.get({ email });
  return user != null;
}
