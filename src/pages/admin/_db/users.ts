import { and, eq, not } from "drizzle-orm";
import { users } from "../../../db/schema";
import { db } from "../../../db/db";
import type { UsersTableData } from "./types";
import type { userRoles } from "../../../db/schemas/users";
import type { SelectOption } from "../../../components/global/form/types";

export async function getUsersTableData(opts?: {
  role?: (typeof userRoles)[number];
}): Promise<UsersTableData[]> {
  const usersData = await db
    .select({
      id: users.id,
      name: users.username,
      email: users.email,
      role: users.role,
      phone: users.phone,
    })
    .from(users)
    .where(
      and(
        eq(users.role, opts?.role ?? "user"),
        not(eq(users.status, "deleted")),
      ),
    )
    .orderBy(users.createdAt);
  return usersData;
}

export async function getManicuristsOptions(): Promise<SelectOption[]> {
  const manicurists = await getUsersTableData({ role: "manicurist" });
  return manicurists.map((manicurist) => ({
    value: manicurist.id,
    label: manicurist.name,
  }));
}
