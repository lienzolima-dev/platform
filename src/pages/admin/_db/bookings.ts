import { and, count, gte, lte } from "drizzle-orm";
import { db } from "../../../db/db";
import type { Booking } from "./types";
import { bookings } from "../../../db/schema";

function formatDateString(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export async function getBookings({
  offset,
  limit,
  day,
}: {
  offset?: number;
  limit?: number;
  day?: Date;
}): Promise<Booking[]> {
  const bookings = await db.query.bookings.findMany({
    orderBy: (bookings, { desc }) => [desc(bookings.startTime)],
    offset: offset ?? 0,
    limit: limit ?? 10,
    where: (bookings, { gte, lte }) => {
      if (day) {
        const start = new Date(day);
        start.setHours(0, 0, 0, 0);
        const end = new Date(day);
        end.setHours(23, 59, 59, 999);
        return and(
          gte(bookings.startTime, start.toISOString()),
          lte(bookings.startTime, end.toISOString()),
        );
      }
    },
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
      paymentStatus: booking.paymentStatus,
      services: booking.bookingsServicesDetails.map(
        (detail) => detail.services,
      ),
      totalPrice: booking.totalPrice,
      advanceAmount: booking.advanceAmount,
      extras: booking.bookingsExtrasDetails.map((detail) => detail.extras),
      manicurist: booking.manicurist.username,
      status: booking.status,
    };
  });

  return formattedBookings;
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = await db.query.bookings.findMany({
    orderBy: (bookings, { desc }) => [desc(bookings.startTime)],
    where: (bookings, { eq }) => eq(bookings.id, id),
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
    limit: 1,
  });

  const booking = bookings[0];

  if (!booking) {
    return null;
  }

  return {
    id: booking.id,
    startTime: formatDateString(booking.startTime),
    endTime: formatDateString(booking.endTime),
    date: new Date(booking.startTime),
    username: booking.name,
    email: booking.email,
    phone: booking.phone,
    paymentStatus: booking.paymentStatus,
    services: booking.bookingsServicesDetails.map((detail) => detail.services),
    totalPrice: booking.totalPrice,
    advanceAmount: booking.advanceAmount,
    extras: booking.bookingsExtrasDetails.map((detail) => detail.extras),
    manicurist: booking.manicurist.username,
    status: booking.status,
  };
}

export async function getAllBookings(): Promise<Booking[]> {
  const bookings = await getBookings({});
  return bookings;
}

export async function getBookingsCount({
  day,
}: {
  day?: Date;
}): Promise<number> {
  let query = db
    .select({
      count: count(),
    })
    .from(bookings)
    .$dynamic();

  if (day) {
    const start = new Date(day);
    start.setHours(0, 0, 0, 0);
    const end = new Date(day);
    end.setHours(23, 59, 59, 999);

    query = query.where(
      and(
        gte(bookings.startTime, start.toISOString()),
        lte(bookings.startTime, end.toISOString()),
      ),
    );
  }

  const bookingsCount = await query;

  return bookingsCount[0].count;
}

export async function getPaginatedBookings({
  page,
  pageSize,
  day,
}: {
  page: number;
  pageSize: number;
  day?: Date;
}): Promise<{
  data: Booking[];
  count: number;
  totalPages: number;
}> {
  const offset = (page - 1) * pageSize;

  const [bookings, bookingCount] = await Promise.all([
    getBookings({ offset, limit: pageSize, day }),
    getBookingsCount({ day }),
  ]);

  return {
    data: bookings,
    count: bookingCount,
    totalPages: Math.ceil(bookingCount / pageSize),
  };
}

export async function getUpcomingBookings(): Promise<Booking[]> {
  const now = new Date();

  const bookings = await getBookings({
    offset: 0,
    limit: 10,
    day: now,
  });

  return bookings;
}
