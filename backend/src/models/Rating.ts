import { db } from "../database";

export type Rating = {
  gameId: number;
  score: number;
};

db.exec(`--sql
  create table if not exists ratings(
    id      integer primary key,
    gameId  integer not null,
    score  real
  )
`);

type GetRatingsParams = {
  limit: number;
  offset: number;
};

type GetRatingsByGameParams = {
  gameId: number;
  limit: number;
  offset: number;
};

type CreateRatingParams = {
  gameId: number;
  score: number;
};

export const getRatings = db.prepare<GetRatingsParams, Rating>(`--sql
  select * from ratings limit @limit offset @offset
`);

export const getRatingsByGame = db.prepare<
  GetRatingsByGameParams,
  Rating
>(`--sql
  select * from ratings where gameId = @gameId limit @limit offset @offset
`);

export const createRating = db.prepare<CreateRatingParams>(`--sql
  insert into ratings(gameId, score) values (@gameId, @score)
`);
