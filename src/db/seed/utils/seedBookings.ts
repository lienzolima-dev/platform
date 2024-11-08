import { bookings as bookingsTable } from "../../schema";
import { db } from "../../db";

type bookingInsertType = typeof bookingsTable.$inferInsert;

export async function seedBookings(bookings: bookingInsertType[]) {
  try {
    await db.insert(bookingsTable).values(bookings);
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
}
