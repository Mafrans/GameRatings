import { getGameBySlug } from "../src/models/Game";
import { User, createUser, hashPassword } from "../src/models/User";
import { Role } from "../src/types/Role";

const userSeeds = [
  {
    email: "malte.kluft@gmail.com",
    username: "mafrans",
    password: "password",
    role: Role.Admin,
  },
  {
    email: "test@mail.com",
    username: "test_user",
    password: "password",
    role: Role.User,
  },
];

export async function seedUsers() {
  console.log("Seeding users");

  for (const user of userSeeds) {
    process.stdout.write(`${user.username}...`);
    try {
      createUser.run({
        ...user,
        password: await hashPassword(user.password),
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
