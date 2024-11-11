import { eq, not } from "drizzle-orm";
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
      phone: users.cellPhone,
    })
    .from(users)
    .where(not(eq(users.role, "user")))
    .orderBy(users.createdAt);
  return collaborators;
}
