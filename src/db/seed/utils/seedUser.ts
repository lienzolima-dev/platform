import { hash } from "@node-rs/argon2";
import { users as usersTable } from "../../schema";
import { db } from "../../db";

type userInsertType = typeof usersTable.$inferInsert;

export async function seedUser(users: userInsertType[]) {
  // Transform passwordHash to a hashed password
  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      if (!user.passwordHash) {
        throw new Error("[Seed Error]: passwordHash is required");
      }

      const passwordHash = await hash(user.passwordHash, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });

      return {
        ...user,
        passwordHash,
      };
    }),
  );

  // Insert users into the database
  await db.insert(usersTable).values(hashedUsers);
}
