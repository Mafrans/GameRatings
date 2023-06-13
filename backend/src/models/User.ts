import { db } from "../database";
import bcrypt from "bcrypt";
import { Role } from "../types/Role";

export type User = {
  email: string;
  username: string;
  password: string;
  role: string;
};

db.exec(`--sql
  create table if not exists users(
    id          integer primary key,
    email       text unique not null,
    username    text unique not null,
    role        text default "${Role.User}",
    password    text not null
  )
`);

type CreateUserParams = {
  email: string;
  username: string;
  password: string;
  role: Role;
};

type GetUserByIdParams = {
  id: number;
};

type GetUserByEmailParams = {
  email: string;
};

type GetUserByUsernameParams = {
  username: string;
};

export const createUser = db.prepare<CreateUserParams, void>(`--sql
  insert into users(email, username, password, role) values (@email, @username, @password, @role)
`);

export const getUserById = db.prepare<GetUserByIdParams, User>(`--sql
  select * from users where id = @id limit 1;
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

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, +process.env.PASSWORD_ROUNDS);
}
