import { and, eq, not, desc, or, like, count } from 'drizzle-orm';
import { u as users, d as db } from './db_DooF3xjr.mjs';
import './complaints_DeMGL233.mjs';

async function getUsersTableData({
  role,
  offset,
  limit,
  nameOrEmail
}) {
  const coditions = [
    and(eq(users.role, role ?? "user"), not(eq(users.status, "deleted")))
  ];
  let query = db.select({
    id: users.id,
    name: users.username,
    email: users.email,
    role: users.role,
    phone: users.phone
  }).from(users).orderBy(desc(users.createdAt)).$dynamic();
  if (nameOrEmail) {
    coditions.push(
      or(
        like(users.username, `%${nameOrEmail}%`),
        like(users.email, `%${nameOrEmail}%`)
      )
    );
  }
  if (limit) query = query.limit(limit);
  if (offset) query = query.offset(offset);
  query = query.where(and(...coditions));
  const usersData = await query;
  return usersData;
}
async function getUsersCount({
  role,
  nameOrEmail
}) {
  const conditions = [
    and(eq(users.role, role ?? "user"), not(eq(users.status, "deleted")))
  ];
  let query = db.select({ count: count() }).from(users).$dynamic();
  if (nameOrEmail) {
    conditions.push(
      or(
        like(users.username, `%${nameOrEmail}%`),
        like(users.email, `%${nameOrEmail}%`)
      )
    );
  }
  query = query.where(and(...conditions));
  const usersCount = await query;
  return usersCount[0].count;
}
async function getPaginatedUsers({
  page,
  pageSize,
  nameOrEmail
}) {
  const offset = (page - 1) * pageSize;
  const [usersData, usersCount] = await Promise.all([
    getUsersTableData({
      role: "user",
      offset,
      limit: pageSize,
      nameOrEmail
    }),
    getUsersCount({
      role: "user",
      nameOrEmail
    })
  ]);
  return {
    data: usersData,
    count: usersCount,
    totalPages: Math.ceil(usersCount / pageSize)
  };
}
async function getManicuristsOptions() {
  const manicurists = await getUsersTableData({ role: "manicurist" });
  return manicurists.map((manicurist) => ({
    value: manicurist.id,
    label: manicurist.name
  }));
}

export { getPaginatedUsers as a, getManicuristsOptions as g };
