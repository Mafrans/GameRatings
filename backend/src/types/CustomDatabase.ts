import { RunResult, Database, Statement } from "better-sqlite3";
import { DBRow } from "./DBRow";

/**
 * This file includes some database type overrides I wrote for convenience
 */

interface CustomStatement<T extends unknown[], K = unknown> extends Statement {
  run(...params: T): RunResult;
  get(...params: T): DBRow<K> | undefined;
  all(...params: T): DBRow<K>[];
}

export interface CustomDatabase extends Database {
  prepare<T extends unknown[] | {} = unknown[], K = unknown>(
    source: string
  ): T extends unknown[] ? CustomStatement<T, K> : CustomStatement<[T], K>;
}
