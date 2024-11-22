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
    orderBy: (bookings, { desc }) => [desc(bookings.startTime)],
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
      phone: booking.phone,
      email: booking.email,
      paymentStatus: formatPaymentStatus(booking.paymentStatus),
      services: booking.bookingsServicesDetails.map(
        (detail) => detail.services,
      ),
      totalPrice: booking.totalPrice,
      advanceAmount: booking.advanceAmount,
      extras: booking.bookingsExtrasDetails.map((detail) => detail.extras),
      manicurist: booking.manicurist.username,
    };
  });

  return formattedBookings;
}

export async function getUpcomingBookings(): Promise<Booking[]> {
  const now = new Date();
  const todayStart = new Date(now.setHours(0, 0, 0, 0));
  const todayEnd = new Date(now.setHours(23, 59, 59, 999));

  const bookings = await db.query.bookings.findMany({
    orderBy: (bookings, { desc }) => [desc(bookings.startTime)],
    where: (bookings, { gte, lte, and }) =>
      and(
        gte(bookings.startTime, todayStart.toISOString()),
        lte(bookings.startTime, todayEnd.toISOString()),
      ),
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
      email: booking.email,
      phone: booking.phone,
      paymentStatus: formatPaymentStatus(booking.paymentStatus),
      services: booking.bookingsServicesDetails.map(
        (detail) => detail.services,
      ),
      totalPrice: booking.totalPrice,
      advanceAmount: booking.advanceAmount,
      extras: booking.bookingsExtrasDetails.map((detail) => detail.extras),
      manicurist: booking.manicurist.username,
    };
  });

  return formattedBookings;
}
