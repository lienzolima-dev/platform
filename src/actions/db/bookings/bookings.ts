import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";
import { db } from "../../../db/db";
import { eq } from "drizzle-orm";
import { bookings as bookingsTable, users } from "../../../db/schema";

function isSameDay(dateString1: string, dateString2: string) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export const get = defineAction({
  input: z.object({
    date: z.string().optional(),
  }),
  handler: async (input, _ctx) => {
    try {
      const { date } = input;
      const bookings = await db
        .select({
          startTime: bookingsTable.startTime,
          endTime: bookingsTable.endTime,
          manicurist: users.username,
          name: bookingsTable.name,
          paymentStatus: bookingsTable.paymentStatus,
        })
        .from(bookingsTable)
        .innerJoin(users, eq(bookingsTable.idManicurist, users.id));

      if (date) {
        // TODO: filter using db query, instead of filtering in memory
        const filteredBookings = bookings.filter((booking) => {
          if (isSameDay(booking.startTime, date)) {
            return true;
          }

          return false;
        });

        return filteredBookings;
      }

      return bookings;
    } catch (_e) {
      throw new ActionError({
        code: "CONFLICT",
        message: "Error al obtener reservas",
      });
    }
  },
});
