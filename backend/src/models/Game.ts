import { db } from "../database";

export type Game = {
  title: string;
  slug: string;
};

db.exec(`--sql
  create table if not exists games(
    id      integer primary key,
    title   text,
    slug    text unique
  )
`);

type GetGamesParams = { limit: number; offset: number };

type GetGameByIdParams = { id: number };

type GetGameBySlugParams = { slug: string };

type SearchGamesByTitleParams = {
  title: string;
  limit: number;
  offset: number;
};

type GetGamesSortedByTitleParams = {
  limit: number;
  offset: number;
};

type CreateGameParams = { title: string; slug: string };

export const getGames = db.prepare<GetGamesParams, Game>(`--sql
  select * from games limit @limit offset @offset
`);

export const getGameById = db.prepare<GetGameByIdParams, Game>(`--sql
  select * from games where rowid = @id limit 1
`);

export const getGameBySlug = db.prepare<GetGameBySlugParams, Game>(`--sql
  select * from games where slug = @slug limit 1
`);

export const searchGamesByTitle = db.prepare<
  SearchGamesByTitleParams,
  Game
>(`--sql
  select * from games where title like '%@title%' limit @limit offset @offset
`);

export const getGamesSortedByTitleAscending = db.prepare<
  GetGamesSortedByTitleParams,
  Game
>(`--sql
  select * from games order by title ASC limit @limit offset @offset
`);

export const getGamesSortedByTitleDescending = db.prepare<
  GetGamesSortedByTitleParams,
  Game
>(`--sql
  select * from games order by title DESC limit @limit offset @offset
`);

export const createGame = db.prepare<CreateGameParams, Game>(`--sql
  insert into games(title, slug) values (@title, @slug)
`);
