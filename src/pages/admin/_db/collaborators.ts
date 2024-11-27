import { and, count, eq, like, not, or } from "drizzle-orm";
import { users } from "../../../db/schema";
import { db } from "../../../db/db";
import type { CollaboratorsTableData } from "./types";
import type { userRoles } from "../../../db/schemas/users";

export async function getCollaboratorsTableData({
  offset,
  limit,
  nameOrEmail,
}: {
  role?: (typeof userRoles)[number];
  offset?: number;
  limit?: number;
  nameOrEmail?: string;
}): Promise<CollaboratorsTableData[]> {
  const conditions = [
    and(not(eq(users.role, "user")), not(eq(users.status, "deleted"))),
  ];

  const query = db
    .select({
      id: users.id,
      name: users.username,
      email: users.email,
      role: users.role,
      phone: users.phone,
    })
    .from(users)
    .orderBy(users.createdAt)
    .$dynamic();

  if (nameOrEmail) {
    conditions.push(
      or(
        like(users.username, `%${nameOrEmail}%`),
        like(users.email, `%${nameOrEmail}%`),
      ),
    );
  }

  if (limit) query.limit(limit);
  if (offset) query.offset(offset);

  query.where(and(...conditions));

  const collaborators = await query;
  return collaborators;
}

export async function getCollaboratorsCount({
  nameOrEmail,
}: {
  nameOrEmail?: string;
}): Promise<number> {
  const conditions = [
    and(not(eq(users.role, "user")), not(eq(users.status, "deleted"))),
  ];

  let query = db.select({ count: count() }).from(users).$dynamic();

  if (nameOrEmail) {
    conditions.push(
      or(
        like(users.username, `%${nameOrEmail}%`),
        like(users.email, `%${nameOrEmail}%`),
      ),
    );
  }

  query = query.where(and(...conditions));

  const collaboratorsCount = await query;
  return collaboratorsCount[0].count;
}

export async function getPaginatedCollaborators({
  page,
  pageSize,
  nameOrEmail,
}: {
  page: number;
  pageSize: number;
  nameOrEmail?: string;
}): Promise<{
  data: CollaboratorsTableData[];
  count: number;
}> {
  const offset = (page - 1) * pageSize;

  const collaborators = await getCollaboratorsTableData({
    offset,
    limit: pageSize,
    nameOrEmail,
  });

  const collaboratorsCount = await getCollaboratorsCount({ nameOrEmail });

  return {
    data: collaborators,
    count: collaboratorsCount,
  };
}
