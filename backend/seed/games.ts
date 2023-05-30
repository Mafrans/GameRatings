import { Game, createGame } from "../src/models/Game";

const games: Game[] = [
  {
    title: "Hotline Miami",
    slug: "hotline-miami",
  },
  {
    title: "Streets of Rage 2",
    slug: "streets-of-rage-2",
  },
  {
    title: "Dishonored",
    slug: "dishonored",
  },
  {
    title: "Deus Ex",
    slug: "deus-ex",
  },
];

export async function seedGames() {
  console.log("Seeding games");

  for (const game of games) {
    process.stdout.write(game.title);
    try {
      createGame.run(game);
    } catch (err) {
      process.stdout.write(" ERROR\n");
      continue;
    }
    process.stdout.write(" OK\n");
  }

  console.log("Finished");
  console.log("--------------------------");
}
