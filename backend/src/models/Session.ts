import dayjs from "dayjs";
import { db } from "../database";
import crypto from "crypto";

export type Session = {
  userId: number;
  token: string;
  expiresAt: string;
};

db.exec(`--sql
  create table if not exists sessions(
    id        integer primary key,
    userId    integer not null,
    token     text not null,
    expiresAt datetime not null,

    foreign key (userId) references users(id)
  )
`);

type GetSessionByTokenParams = {
  token: string;
};

type CreateSessionParams = {
  userId: number;
  token: string;
  expiresAt: string;
};

export const getSessionByToken = db.prepare<
  GetSessionByTokenParams,
  Session
>(`--sql
  select * from sessions where token = @token limit 1
`);

export const createSession = db.prepare<
  CreateSessionParams,
  Pick<Session, "token">
>(`--sql
  insert into sessions(userId, token, expiresAt) values (@userId, @token, @expiresAt) returning token
`);

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function getExpirationDate(): string {
  return dayjs().add(24, "h").format("YYYY-MM-DD HH:mm:ss");
}
