import { and, count, desc, eq, like, not, or } from "drizzle-orm";
import { users } from "../../../db/schema";
import { db } from "../../../db/db";
import type { UsersTableData } from "./types";
import type { userRoles } from "../../../db/schemas/users";
import type { SelectOption } from "../../../components/global/form/types";

export async function getUsersTableData({
  role,
  offset,
  limit,
  nameOrEmail,
}: {
  role?: (typeof userRoles)[number];
  offset?: number;
  limit?: number;
  nameOrEmail?: string;
}): Promise<UsersTableData[]> {
  const coditions = [
    and(eq(users.role, role ?? "user"), not(eq(users.status, "deleted"))),
  ];

  let query = db
    .select({
      id: users.id,
      name: users.username,
      email: users.email,
      role: users.role,
      phone: users.phone,
    })
    .from(users)
    .orderBy(desc(users.createdAt))
    .$dynamic();

  if (nameOrEmail) {
    coditions.push(
      or(
        like(users.username, `%${nameOrEmail}%`),
        like(users.email, `%${nameOrEmail}%`),
      ),
    );
  }

  if (limit) query = query.limit(limit);
  if (offset) query = query.offset(offset);

  query = query.where(and(...coditions));

  const usersData = await query;
  return usersData;
}

export async function getUsersCount({
  role,
  nameOrEmail,
}: {
  role?: (typeof userRoles)[number];
  nameOrEmail?: string;
}): Promise<number> {
  const conditions = [
    and(eq(users.role, role ?? "user"), not(eq(users.status, "deleted"))),
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

  const usersCount = await query;
  return usersCount[0].count;
}

export async function getPaginatedUsers({
  page,
  pageSize,
  nameOrEmail,
}: {
  page: number;
  pageSize: number;
  nameOrEmail?: string;
}): Promise<{
  data: UsersTableData[];
  count: number;
}> {
  const offset = (page - 1) * pageSize;

  const usersData = await getUsersTableData({
    role: "user",
    offset,
    limit: pageSize,
    nameOrEmail,
  });

  const usersCount = await getUsersCount({
    role: "user",
    nameOrEmail,
  });

  return {
    data: usersData,
    count: usersCount,
  };
}

export async function getManicuristsOptions(): Promise<SelectOption[]> {
  const manicurists = await getUsersTableData({ role: "manicurist" });
  return manicurists.map((manicurist) => ({
    value: manicurist.id,
    label: manicurist.name,
  }));
}
