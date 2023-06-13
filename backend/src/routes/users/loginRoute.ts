import { FastifyReply } from "fastify";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { getUserByUsername, getUserByEmail, User } from "../../models/User";
import { LoginRequest } from "../../types/LoginRequest";
import {
  createSession,
  generateToken,
  getExpirationDate as generateSQLiteExpirationDate,
} from "../../models/Session";
import { DBRow } from "../../types/DBRow";

export async function loginRoute(request: LoginRequest, reply: FastifyReply) {
  const { body } = request;

  let user: DBRow<User>;
  if ("email" in body) {
    user = getUserByEmail.get(body);
  } else if ("username" in body) {
    user = getUserByUsername.get(body);
  }

  const authorized = await bcrypt.compare(body.password, user?.password);
  if (user == null || !authorized) {
    reply.statusCode = 401;
    throw new Error("Username or password is invalid.");
  }

  return createSession.get({
    token: generateToken(),
    expiresAt: generateSQLiteExpirationDate(),
    userId: user.id,
  });
}
