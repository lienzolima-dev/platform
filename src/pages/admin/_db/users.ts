import { and, eq, not } from "drizzle-orm";
import { users } from "../../../db/schema";
import { db } from "../../../db/db";
import type { UsersTableData } from "./types";

export async function getUsersTableData(): Promise<UsersTableData[]> {
  const usersData = await db
    .select({
      id: users.id,
      name: users.username,
      email: users.email,
      role: users.role,
      phone: users.phone,
    })
    .from(users)
    .where(and(eq(users.role, "user"), not(eq(users.status, "deleted"))))
    .orderBy(users.createdAt);
  return usersData;
}
