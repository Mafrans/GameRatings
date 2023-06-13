import { FastifyReply } from "fastify";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { getUserByUsername, getUserByEmail, User } from "../../models/User";
import { LoginRequest } from "../../types/LoginRequest";
import { createSession, clearExpiredSessions } from "../../models/Session";
import { DBRow } from "../../types/DBRow";
import { sqliteDateTimeFormat } from "../../util/date";

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

  clearExpiredSessions.run();

  const { token } = createSession.get({
    token: crypto.randomBytes(32).toString("hex"),
    expiresAt: dayjs().add(24, "h").format(sqliteDateTimeFormat),
    userId: user.id,
  });

  reply.setCookie("token", token, { signed: true });

  return { token };
}
