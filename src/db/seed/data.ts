import type { users } from "../schema";

export const adminsToSeed: (typeof users.$inferInsert)[] = [
  {
    email: "dev@dev.com",
    username: "dev",
    emailVerified: true,
    role: "admin",
    passwordHash: "123", // For testing purposes only
  },
];
