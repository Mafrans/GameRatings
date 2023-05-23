import { db } from "../database";
import type { DBResult } from "../types/DBResult";

export type Game = {
  title: string;
  slug: string;
  rating: number;
};

db.exec(`--sql
  create table if not exists Games(
    title   text,
    slug    text unique,
    rating  real
  )
`);

const getGamesStmt = await db.prepare(`--sql
  select * from Games limit @limit offset @offset
`);

const getGameByIdStmt = await db.prepare(`--sql
  select * from Games where rowid = @id limit 1
`);

const getGameBySlugStmt = await db.prepare(`--sql
  select * from Games where slug = @slug limit 1
`);

const searchGamesByTitleStmt = await db.prepare(`--sql
  select * from Games where title like '%@title%' limit @limit offset @offset
`);

const getGamesSortedByTitleAscendingStmt = await db.prepare(`--sql
  select * from Games order by title ASC limit @limit offset @offset
`);
const getGamesSortedByTitleDescendingStmt = await db.prepare(`--sql
  select * from Games order by title DESC limit @limit offset @offset
`);

const getGamesSortedByRatingAscendingStmt = await db.prepare(`--sql
  select * from Games order by rating ASC limit @limit offset @offset
`);

const getGamesSortedByRatingDescendingStmt = await db.prepare(`--sql
  select * from Games order by rating DESC limit @limit offset @offset
`);

const createGameStmt = await db.prepare(`--sql
  insert into Games(title, slug, rating) values (@title, @slug, @rating)
`);

export const getGames = (params: { "@limit": number; "@offset": number }) =>
  getGamesStmt.all<DBResult<Game[]>>(params);

export const getGameById = (params: { "@id": number }) =>
  getGameByIdStmt.get<DBResult<Game>>(params);

export const getGameBySlug = (params: { "@slug": number }) =>
  getGameBySlugStmt.get<DBResult<Game>>(params);

export const searchGamesByTitle = (params: {
  "@title": string;
  "@limit": number;
  "@offset": number;
}) => searchGamesByTitleStmt.all<DBResult<Game[]>>(params);

export const getGamesSortedByTitle = (
  direction: "asc" | "desc",
  params: {
    "@limit": number;
    "@offset": number;
  }
) => {
  switch (direction) {
    case "asc":
      return getGamesSortedByTitleAscendingStmt.all<DBResult<Game[]>>(params);
    case "desc":
      return getGamesSortedByTitleDescendingStmt.all<DBResult<Game[]>>(params);
  }
};

export const getGamesSortedByRating = (
  direction: "asc" | "desc",
  params: {
    "@limit": number;
    "@offset": number;
  }
) => {
  switch (direction) {
    case "asc":
      return getGamesSortedByRatingAscendingStmt.all<DBResult<Game[]>>(params);
    case "desc":
      return getGamesSortedByRatingDescendingStmt.all<DBResult<Game[]>>(params);
  }
};

export const createGame = (params: {
  "@title": string;
  "@slug": string;
  "@rating": number;
}) => createGameStmt.run(params);
