import { not, eq, like, and, inArray, count } from 'drizzle-orm';
import { s as services, d as db } from './db_DooF3xjr.mjs';
import './complaints_DeMGL233.mjs';

function formatDuration(decimalHours) {
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
async function getServices({
  offset,
  limit,
  name
}) {
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
    formattedDuration: formatDuration(service.durationHours)
  }));
}
async function getServicesCount({
  name
}) {
  const conditions = [not(eq(services.status, "deleted"))];
  let query = db.select({ count: count() }).from(services).$dynamic();
  if (name) {
    conditions.push(like(services.name, `%${name}%`));
  }
  query = query.where(and(...conditions));
  const servicesCount = await query;
  return servicesCount[0].count;
}
async function getPaginatedServices({
  page,
  pageSize,
  name
}) {
  const offset = (page - 1) * pageSize;
  const [services2, servicesCount] = await Promise.all([
    getServices({ offset, limit: pageSize, name }),
    getServicesCount({ name })
  ]);
  return {
    services: services2,
    count: servicesCount,
    totalPages: Math.ceil(servicesCount / pageSize)
  };
}
async function getServicesByCategory(category) {
  const servicesData = await db.select().from(services).where(
    and(
      not(eq(services.status, "deleted")),
      inArray(services.category, category)
    )
  );
  return servicesData.map((service) => ({
    ...service,
    formattedDuration: formatDuration(service.durationHours)
  }));
}

export { getPaginatedServices as a, getServicesByCategory as b, getServices as g };
