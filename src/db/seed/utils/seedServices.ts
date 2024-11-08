import { services as servicesTable } from "../../schema";
import { db } from "../../db";

type serviceInsertType = typeof servicesTable.$inferInsert;

export async function seedServices(services: serviceInsertType[]) {
  try {
    await db.insert(servicesTable).values(services);
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
}
