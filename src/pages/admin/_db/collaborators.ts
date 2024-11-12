import { and, eq, not } from "drizzle-orm";
import { users } from "../../../db/schema";
import { db } from "../../../db/db";
import type { CollaboratorsTableData } from "./types";

export async function getCollaboratorsTableData(): Promise<
  CollaboratorsTableData[]
> {
  const collaborators = await db
    .select({
      id: users.id,
      name: users.username,
      email: users.email,
      role: users.role,
      phone: users.phone,
    })
    .from(users)
    .where(and(not(eq(users.role, "user")), not(eq(users.status, "deleted"))))
    .orderBy(users.createdAt);
  return collaborators;
}
