import { getGameBySlug } from "../src/models/Game";
import { Rating, createRating } from "../src/models/Rating";

const ratingSeeds = [
  {
    slug: "hotline-miami",
    score: 8,
  },
  {
    slug: "streets-of-rage-2",
    score: 7,
  },
  {
    slug: "dishonored",
    score: 9,
  },
  {
    slug: "deus-ex",
    score: 7,
  },
];

export async function seedRatings() {
  console.log("Seeding ratings");

  for (const rating of ratingSeeds) {
    const game = getGameBySlug.get({ slug: rating.slug });
    process.stdout.write(`${game.title} (${rating.score} / 10)...`);
    try {
      createRating.run({
        gameId: game.id,
        score: rating.score,
      });
    } catch (err) {
      process.stdout.write(" ERROR\n");
      console.error(err);
      continue;
    }
    process.stdout.write(" OK\n");
  }

  console.log("Finished");
  console.log("--------------------------");
}
