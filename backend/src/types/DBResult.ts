export type DBResult<T> = T & {
  rowid: number;
};
