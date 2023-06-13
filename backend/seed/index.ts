import { seedGames } from "./games";
import dotenv from "dotenv";
import { seedRatings } from "./ratings";
import { seedUsers } from "./users";
import { join } from "path";

dotenv.config({
  path: join(process.cwd(), ".env"),
});

console.log(process.env);

await seedGames();
await seedRatings();
await seedUsers();
