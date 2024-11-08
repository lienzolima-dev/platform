import { bookingsExtrasDetails as bookingsExtrasDetailsTable } from "../../schema";
import { db } from "../../db";

type bookingsExtrasDetailInsertType =
  typeof bookingsExtrasDetailsTable.$inferInsert;

export async function seedBookingsExtrasDetails(
  bookingsExtrasDetails: bookingsExtrasDetailInsertType[],
) {
  try {
    await db.insert(bookingsExtrasDetailsTable).values(bookingsExtrasDetails);
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
}
