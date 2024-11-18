import { db } from "../../../db/db";
import { services } from "../../../db/schema";
import type { SelectOption } from "../../../components/global/form/types";

export async function getServices() {
  const data = await db.select().from(services);
  return data;
}

export async function getServicesOptions(): Promise<SelectOption[]> {
  const services = await getServices();
  return services.map((service) => ({
    value: service.id,
    label: service.name,
  }));
}
