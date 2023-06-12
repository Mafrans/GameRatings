import { db } from "../database";

export type User = {
  email: string;
  username: string;
  password: string;
};

db.exec(`--sql
  create table if not exists users(
    id          integer primary key,
    email       text unique not null,
    username    text unique not null,
    password    text not null
  )
`);

type CreateUserParams = {
  email: string;
  username: string;
  password: string;
};

type GetUserByEmailParams = {
  email: string;
};

type GetUserByUsernameParams = {
  username: string;
};

export const createUser = db.prepare<CreateUserParams, void>(`--sql
  insert into users(email, username, password) values (@email, @username, @password)
`);

export const getUserByEmail = db.prepare<GetUserByEmailParams, User>(`--sql
  select * from users where email = @email limit 1;
`);

export const getUserByUsername = db.prepare<
  GetUserByUsernameParams,
  User
>(`--sql
  select * from users where username = @username limit 1;
`);
