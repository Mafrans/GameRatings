import Database from "better-sqlite3";
import { CustomDatabase } from "./types/CustomDatabase";

export const db = new Database("database.sql") as CustomDatabase;
db.pragma("foreign_keys = ON");
