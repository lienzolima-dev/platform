import { bookingsServicesDetails as bookingsServicesDetailsTable } from "../../schema";
import { db } from "../../db";

type bookingsServicesDetailInsertType =
  typeof bookingsServicesDetailsTable.$inferInsert;

export async function seedBookingsServicesDetails(
  bookingsServicesDetails: bookingsServicesDetailInsertType[],
) {
  try {
    await db
      .insert(bookingsServicesDetailsTable)
      .values(bookingsServicesDetails);
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
}
