import { and, like, count, not, eq } from "drizzle-orm";
import type { SelectOption } from "../../../components/global/form/types";
import { db } from "../../../db/db";
import { extras } from "../../../db/schema";
import type { ExtrasTableData } from "./types";

export async function getExtras({
  offset,
  limit,
  name,
}: {
  offset?: number;
  limit?: number;
  name?: string;
}): Promise<ExtrasTableData[]> {
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

export async function getExtrasCount({
  name,
}: {
  name?: string;
}): Promise<number> {
  const conditions = [not(eq(extras.status, "deleted"))];
  let query = db.select({ count: count() }).from(extras).$dynamic();
  if (name) {
    conditions.push(like(extras.name, `%${name}%`));
  }

  query = query.where(and(...conditions));
  const extrasCount = await query;
  return extrasCount[0].count;
}

export async function getExtrasOptions(): Promise<SelectOption[]> {
  const extras = await getExtras({});
  return extras.map((extra) => ({
    value: extra.id,
    label: extra.name,
  }));
}

export async function getPaginatedExtras({
  page,
  pageSize,
  name,
}: {
  page: number;
  pageSize: number;
  name?: string;
}): Promise<{
  extras: ExtrasTableData[];
  count: number;
  totalPages: number;
}> {
  const offset = (page - 1) * pageSize;
  const [extras, extrasCount] = await Promise.all([
    getExtras({ offset, limit: pageSize, name }),
    getExtrasCount({ name }),
  ]);
  return {
    extras: extras,
    count: extrasCount,
    totalPages: Math.ceil(extrasCount / pageSize),
  };
}
