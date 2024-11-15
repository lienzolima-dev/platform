import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";
import { db } from "../../../db/db";
import { eq } from "drizzle-orm";
import {
  bookingsExtrasDetails,
  bookingsServicesDetails,
  bookings as bookingsTable,
  users,
} from "../../../db/schema";
import { paymentStatuses } from "../../../db/schemas/bookings";
import { ulid } from "ulid";

function isSameDay(dateString1: string, dateString2: string) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function getTimeObjet(time: string) {
  const hours = Number.parseInt(time.split(":")[0]);
  const minutes = Number.parseInt(time.split(":")[1]);

  return { hours, minutes };
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

export const add = defineAction({
  input: z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.string().email("El email no es válido"),
    phone: z.string().min(9, "El teléfono debe tener al menos 9 caracteres"),
    manicuristId: z.string().min(1, "El id del manicurista no es válido"),
    paymentStatus: z.enum(paymentStatuses, {
      message: "El estado de pago no es válido",
    }),
    services: z
      .array(z.string())
      .min(1, "Debe seleccionar al menos un servicio"),
    extras: z.array(z.string()).optional(),
    totalPrice: z.number().min(0, "El precio total no es válido"),
    date: z.string().refine((dateString) => {
      return !Number.isNaN(Date.parse(dateString));
    }, "La fecha no es válida"),
    startTime: z.string().refine((startTime) => {
      const time = startTime.split(":");
      if (time.length !== 2) return false;
      if (time[0].length !== 2 || time[1].length !== 2) return false;
      return true;
    }),
    endTime: z.string().refine((endTime) => {
      const time = endTime.split(":");
      if (time.length !== 2) return false;
      if (time[0].length !== 2 || time[1].length !== 2) return false;
      return true;
    }),
  }),
  handler: async (input, _ctx) => {
    const {
      name,
      email,
      phone,
      manicuristId,
      paymentStatus,
      services,
      extras,
      totalPrice,
      startTime: startTimeString,
      endTime: endTimeString,
    } = input;

    console.log(input);

    const startTimeObj = getTimeObjet(startTimeString);
    const endTimeObj = getTimeObjet(endTimeString);

    const date = new Date(input.date);

    const startTime = new Date(date);
    startTime.setHours(startTimeObj.hours, startTimeObj.minutes);
    const endTime = new Date(date);
    endTime.setHours(endTimeObj.hours, endTimeObj.minutes);

    try {
      const newId = ulid();

      // Insert booking
      await db.insert(bookingsTable).values({
        id: newId,
        name,
        email,
        phone,
        idManicurist: manicuristId,
        paymentStatus,
        totalPrice,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });

      // Add relation with services and extras
      for (const service of services) {
        await db.insert(bookingsServicesDetails).values({
          idBooking: newId,
          idService: service,
        });
      }

      if (extras) {
        for (const extra of extras) {
          await db.insert(bookingsExtrasDetails).values({
            idBooking: newId,
            idExtra: extra,
          });
        }
      }
    } catch (e) {
      console.log(e);
      if (e instanceof ActionError) {
        throw e;
      }

      throw new ActionError({
        code: "CONFLICT",
        message: "Error al añadir reserva",
      });
    }

    console.log("THIS IS ADD BOOKING");
  },
});
