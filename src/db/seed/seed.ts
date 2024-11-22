import { adminsToSeed } from "./data";
import { seedUser } from "./utils/seedUser";
import { tasksToSeed } from "./data";
import { seedTask } from "./utils/seedTask";
import { manicuristsToSeed } from "./data";
import { seedServices } from "./utils/seedServices";
import { servicesToSeed } from "./data";
import { seedExtras } from "./utils/seedExtras";
import { extrasToSeed } from "./data";
import { seedBookings } from "./utils/seedBookings";
import { bookingsToSeed } from "./data";
import { seedBookingsServicesDetails } from "./utils/seedBookingsServicesDetails";
import { bookingsServicesDetailsToSeed } from "./data";
import { seedBookingsExtrasDetails } from "./utils/seedBookingsExtrasDetails";
import { bookingsExtrasDetailsToSeed } from "./data";
import { usersToSeed } from "./data";

async function seed() {
  await seedUser(adminsToSeed);
  await seedUser(manicuristsToSeed);
  await seedUser(usersToSeed);
  await seedTask(tasksToSeed);
  await seedServices(servicesToSeed);
  await seedExtras(extrasToSeed);
  await seedBookings(bookingsToSeed);
  await seedBookingsServicesDetails(bookingsServicesDetailsToSeed);
  await seedBookingsExtrasDetails(bookingsExtrasDetailsToSeed);
}

console.log("[LOG]: Seeding data...");
await seed(); // Throws an error if something goes wrong
console.log("[LOG]: Data seeded successfully!");
