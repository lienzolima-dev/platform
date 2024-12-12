import { and, like, count, not, eq, inArray } from "drizzle-orm";
import { db } from "../../../db/db";
import { services } from "../../../db/schema";
import type { ServicesTableData } from "./types";
import type { SelectOption } from "../../../components/global/form/types";

function formatDuration(decimalHours: number | null): string {
  if (decimalHours === null) return "---";
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);

  if (hours > 0 && minutes === 0) {
    return `${hours}h`;
  }

  if (hours === 0 && minutes > 0) {
    return `${minutes}m`;
  }

  return `${hours}h ${minutes}m`;
}

export async function getServices({
  offset,
  limit,
  name,
}: {
  offset?: number;
  limit?: number;
  name?: string;
}): Promise<ServicesTableData[]> {
  const conditions = [not(eq(services.status, "deleted"))];
  const query = db.select().from(services).$dynamic();
  if (name) {
    conditions.push(like(services.name, `%${name}%`));
  }

  if (limit) query.limit(limit);
  if (offset) query.offset(offset);

  query.where(and(...conditions));

  const data = await query;
  return data.map((service) => ({
    ...service,
    formattedDuration: formatDuration(service.durationHours),
  }));
}

export async function getServicesCount({
  name,
}: {
  name?: string;
}): Promise<number> {
  const conditions = [not(eq(services.status, "deleted"))];
  let query = db.select({ count: count() }).from(services).$dynamic();
  if (name) {
    conditions.push(like(services.name, `%${name}%`));
  }

  query = query.where(and(...conditions));

  const servicesCount = await query;
  return servicesCount[0].count;
}

export async function getServicesOptions(): Promise<SelectOption[]> {
  const services = await getServices({});
  return services.map((service) => ({
    value: service.id,
    label: service.name,
  }));
}

export async function getPaginatedServices({
  page,
  pageSize,
  name,
}: {
  page: number;
  pageSize: number;
  name?: string;
}): Promise<{
  services: ServicesTableData[];
  count: number;
  totalPages: number;
}> {
  const offset = (page - 1) * pageSize;
  const [services, servicesCount] = await Promise.all([
    getServices({ offset, limit: pageSize, name }),
    getServicesCount({ name }),
  ]);
  return {
    services: services,
    count: servicesCount,
    totalPages: Math.ceil(servicesCount / pageSize),
  };
}

export async function getServicesByCategory(
  category: string[],
): Promise<ServicesTableData[]> {
  const servicesData = await db
    .select()
    .from(services)
    .where(
      and(
        not(eq(services.status, "deleted")),
        inArray(services.category, category),
      ),
    );
  return servicesData.map((service) => ({
    ...service,
    formattedDuration: formatDuration(service.durationHours),
  }));
}
