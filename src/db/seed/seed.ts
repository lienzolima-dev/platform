import { adminsToSeed } from "./data";
import { seedUser } from "./utils/seedUser";

async function seed() {
  await seedUser(adminsToSeed);
}

console.log("[LOG]: Seeding data...");
await seed(); // Throws an error if something goes wrong
console.log("[LOG]: Data seeded successfully!");
