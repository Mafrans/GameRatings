import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const db = await open({
  filename: "database.sql",
  driver: sqlite3.Database,
});
