import { not, eq, like, and, count } from 'drizzle-orm';
import { e as extras, d as db } from './db_DooF3xjr.mjs';
import './complaints_DeMGL233.mjs';

async function getExtras({
  offset,
  limit,
  name
}) {
  const conditions = [not(eq(extras.status, "deleted"))];
  const query = db.select().from(extras).$dynamic();
  if (name) {
    conditions.push(like(extras.name, `%${name}%`));
  }
  if (limit) query.limit(limit);
  if (offset) query.offset(offset);
  query.where(and(...conditions));
  const data = await query;
  return data;
}
async function getExtrasCount({
  name
}) {
  const conditions = [not(eq(extras.status, "deleted"))];
  let query = db.select({ count: count() }).from(extras).$dynamic();
  if (name) {
    conditions.push(like(extras.name, `%${name}%`));
  }
  query = query.where(and(...conditions));
  const extrasCount = await query;
  return extrasCount[0].count;
}
async function getPaginatedExtras({
  page,
  pageSize,
  name
}) {
  const offset = (page - 1) * pageSize;
  const [extras2, extrasCount] = await Promise.all([
    getExtras({ offset, limit: pageSize, name }),
    getExtrasCount({ name })
  ]);
  return {
    extras: extras2,
    count: extrasCount,
    totalPages: Math.ceil(extrasCount / pageSize)
  };
}

export { getPaginatedExtras as a, getExtras as g };
