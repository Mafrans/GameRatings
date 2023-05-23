import { Game, createGame } from "../src/models/Game";

const games: Game[] = [
  {
    title: "Hotline Miami",
    slug: "hotline-miami",
    rating: 9,
  },
  {
    title: "Streets of Rage 2",
    slug: "streets-of-rage-2",
    rating: 8.5,
  },
  {
    title: "Dishonored",
    slug: "dishonored",
    rating: 10,
  },
  {
    title: "Deus Ex",
    slug: "deus-ex",
    rating: 8,
  },
];

export async function seedGames() {
  console.log("Seeding games");

  for (const game of games) {
    process.stdout.write(game.title);
    try {
      await createGame({
        "@title": game.title,
        "@slug": game.slug,
        "@rating": game.rating,
      });
    } catch (err) {
      process.stdout.write(" ERROR\n");
      continue;
    }
    process.stdout.write(" OK\n");
  }

  console.log("Finished");
  console.log("--------------------------");
}
