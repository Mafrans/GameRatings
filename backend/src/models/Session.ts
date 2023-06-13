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

type DeleteSessionParams = {
  token: string;
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

export const clearExpiredSessions = db.prepare(`--sql
  delete from sessions where expiresAt < CURRENT_TIMESTAMP
`);

export const deleteSession = db.prepare<DeleteSessionParams, void>(`--sql
  delete from sessions where token = @token
`);

export function checkSessionExpired(session: Session) {
  return dayjs().isAfter(session.expiresAt);
}
