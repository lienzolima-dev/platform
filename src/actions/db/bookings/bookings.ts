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
import { paymentStatuses, bookingStatuses } from "../../../db/schemas/bookings";
import { ulid } from "ulid";
import { resend } from "../../../resend/client";
import { getBookingById } from "../../../pages/admin/_db/bookings";
import { DateTime } from "luxon";

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
    email: z.string().email("El email no es válido").nullable().optional(),
    phone: z
      .string()
      .min(9, "El teléfono debe tener al menos 9 caracteres")
      .nullable()
      .optional(),
    manicuristId: z.string().min(1, "El id del manicurista no es válido"),
    paymentStatus: z.enum(paymentStatuses, {
      message: "El estado de pago no es válido",
    }),
    services: z
      .array(z.string())
      .min(1, "Debe seleccionar al menos un servicio"),
    extras: z.array(z.string()).optional(),
    totalPrice: z.number().min(0, "El precio total no es válido"),
    advanceAmount: z.number().optional(),
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

    let advanceAmount = input.advanceAmount;

    if (paymentStatus === "advance" || paymentStatus === "partial") {
      if (!advanceAmount) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Debe ingresar un monto de adelanto",
        });
      }
    }

    if (advanceAmount && advanceAmount >= totalPrice) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message:
          "El monto de adelanto no puede ser mayor o igual al precio total",
      });
    }

    const startTimeObj = getTimeObjet(startTimeString);
    const endTimeObj = getTimeObjet(endTimeString);

    const date = new Date(input.date);

    const startTime = new Date(date);
    startTime.setHours(startTimeObj.hours, startTimeObj.minutes);
    const endTime = new Date(date);
    endTime.setHours(endTimeObj.hours, endTimeObj.minutes);

    if (paymentStatus === "full") advanceAmount = totalPrice;
    if (paymentStatus === "none") advanceAmount = 0;

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
        advanceAmount,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });

      const uniqueServices = Array.from(new Set(services));
      const uniqueExtras = extras ? Array.from(new Set(extras)) : [];

      // Add relation with services and extras
      for (const service of uniqueServices) {
        if (service === "") continue;
        await db.insert(bookingsServicesDetails).values({
          idBooking: newId,
          idService: service,
        });
      }

      if (extras) {
        for (const extra of uniqueExtras) {
          if (extra === "") continue;
          await db.insert(bookingsExtrasDetails).values({
            idBooking: newId,
            idExtra: extra,
          });
        }
      }

      const addedBooking = await getBookingById(newId);

      // TODO: Improve email template
      if (input.email && addedBooking) {
        resend.emails.send({
          from: "noreply@lienzolima.com",
          to: [input.email],
          subject: "Confirmación de tu reserva en Lienzo Lima",
          html: `<p>Hola ${input.name},</p></br>
               <p>Gracias por elegir Lienzo Lima. Nos complace informarte que tu cita ha sido reservada con éxito. Aquí tienes los detalles de tu reserva:</p></br>
               <p>Servicio(s): ${addedBooking.services.map((service) => service.name).join(", ")}</p>
               <p>Fecha: ${date.toLocaleDateString("es-PE", { day: "numeric", month: "long" })}</p>
               <p>Hora: ${startTime.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })} - ${endTime.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}</p>
               <p>Ubicación: Av. Ernesto Diez Canseco 490, Miraflores 15074, Lima</p>
               <p>Por favor, asegúrate de llegar con 10 minutos de anticipación para garantizarte la mejor experiencia.</p></br>
               <p>La tolerancia es de 10 minutos como máximo, de lo contrario solo realizaremos un esmaltado en gel o rubber tradicional. Si la clienta no desea el servicio de las opciones alternativas, perderá el abono.</p></br>
               <p>Si tienes alguna consulta o necesitas asistencia adicional, estamos disponibles en <a href="https://www.instagram.com/lienzo.lima/" target="_blank" rel="noopener noreferrer">Lienzo Lima</a>.</p></br>
               <p>Saludos cordiales.</p>`,
        });
      }
    } catch (e) {
      console.error("[ERROR]: ", e);
      if (e instanceof ActionError) {
        throw e;
      }

      throw new ActionError({
        code: "CONFLICT",
        message: "Error al añadir reserva",
      });
    }
  },
});

export const edit = defineAction({
  input: z.object({
    bookingId: z.string().min(1, "El id de la reserva es necesario"),
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
    status: z.enum(bookingStatuses),
  }),
  handler: async (input, _ctx) => {
    const { bookingId, startTime, endTime, status } = input;

    const startTimeObj = getTimeObjet(startTime);
    const endTimeObj = getTimeObjet(endTime);

    const date = DateTime.fromISO(input.date, { zone: "America/Lima" });

    const newStartTime = date
      .set({ hour: startTimeObj.hours, minute: startTimeObj.minutes })
      .toUTC()
      .toISO();
    const newEndTime = date
      .set({ hour: endTimeObj.hours, minute: endTimeObj.minutes })
      .toUTC()
      .toISO();

    if (!newStartTime || !newEndTime) {
      throw new ActionError({
        code: "CONFLICT",
        message: "Las fechas de inicio o fin no son válidas",
      });
    }

    try {
      await db
        .update(bookingsTable)
        .set({
          startTime: newStartTime,
          endTime: newEndTime,
          status,
        })
        .where(eq(bookingsTable.id, bookingId));
    } catch (e) {
      console.error("[ERROR]: ", e);
      if (e instanceof ActionError) {
        throw e;
      }

      throw new ActionError({
        code: "CONFLICT",
        message: "Error al editar reserva",
      });
    }
  },
});

export const markAsFinished = defineAction({
  input: z.object({
    bookingId: z.string(),
  }),
  handler: async (input, _ctx) => {
    try {
      await db
        .update(bookingsTable)
        .set({ status: "finished" })
        .where(eq(bookingsTable.id, input.bookingId));
    } catch (_e) {
      throw new ActionError({
        code: "CONFLICT",
        message: "Error al marcar reserva como finalizada",
      });
    }
  },
});
