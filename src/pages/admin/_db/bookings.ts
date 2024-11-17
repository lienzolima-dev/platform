import { db } from "../../../db/db";
import type { Booking } from "./types";

function formatDateString(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatPaymentStatus(paymentStatus: string): string {
  if (paymentStatus === "advance") return "Adelanto";
  if (paymentStatus === "full") return "Pago completo";
  if (paymentStatus === "partial") return "Pago Parcial";
  if (paymentStatus === "none") return "Sin Adelanto";
  return paymentStatus;
}

export async function getAllBookings(): Promise<Booking[]> {
  const bookings = await db.query.bookings.findMany({
    orderBy: (bookings, { asc }) => [asc(bookings.startTime)],
    with: {
      bookingsExtrasDetails: {
        with: {
          extras: true,
        },
      },
      bookingsServicesDetails: {
        with: {
          services: true,
        },
      },
      manicurist: true,
    },
  });

  const formattedBookings = bookings.map((booking) => {
    return {
      id: booking.id,
      startTime: formatDateString(booking.startTime),
      endTime: formatDateString(booking.endTime),
      date: new Date(booking.startTime),
      username: booking.name,
      paymentStatus: formatPaymentStatus(booking.paymentStatus),
      services: booking.bookingsServicesDetails.map(
        (detail) => detail.services,
      ),
      extras: booking.bookingsExtrasDetails.map((detail) => detail.extras),
      manicurist: booking.manicurist.username,
    };
  });

  return formattedBookings;
}

export async function getUpcomingBookings(): Promise<Booking[]> {
  const now = new Date();

  const bookings = await db.query.bookings.findMany({
    orderBy: (bookings, { asc }) => [asc(bookings.startTime)],
    where: (bookings, { gte }) => gte(bookings.startTime, now.toISOString()),
    with: {
      bookingsExtrasDetails: {
        with: {
          extras: true,
        },
      },
      bookingsServicesDetails: {
        with: {
          services: true,
        },
      },
      manicurist: true,
    },
  });

  const formattedBookings = bookings.map((booking) => {
    return {
      id: booking.id,
      startTime: formatDateString(booking.startTime),
      endTime: formatDateString(booking.endTime),
      date: new Date(booking.startTime),
      username: booking.name,
      paymentStatus: formatPaymentStatus(booking.paymentStatus),
      services: booking.bookingsServicesDetails.map(
        (detail) => detail.services,
      ),
      extras: booking.bookingsExtrasDetails.map((detail) => detail.extras),
      manicurist: booking.manicurist.username,
    };
  });

  console.log(JSON.stringify(formattedBookings, null, 2));
  return formattedBookings;
}
