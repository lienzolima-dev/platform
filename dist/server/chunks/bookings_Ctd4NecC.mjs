import { count, and, gte, lte, eq } from 'drizzle-orm';
import { d as db, c as bookings } from './db_DooF3xjr.mjs';
import './complaints_DeMGL233.mjs';

function formatDateString(dateString) {
  return new Date(dateString).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
async function getBookings({
  offset,
  limit,
  day,
  status
}) {
  const bookings2 = await db.query.bookings.findMany({
    orderBy: (bookings3, { desc }) => [desc(bookings3.startTime)],
    offset: offset ?? 0,
    limit,
    where: (bookings3, { gte: gte2, lte: lte2, eq: eq2, and: and2 }) => {
      const conditions = [];
      if (day) {
        const start = new Date(day);
        start.setHours(0, 0, 0, 0);
        const end = new Date(day);
        end.setHours(23, 59, 59, 999);
        conditions.push(
          and2(
            gte2(bookings3.startTime, start.toISOString()),
            lte2(bookings3.startTime, end.toISOString())
          )
        );
      }
      if (status) {
        conditions.push(eq2(bookings3.status, status));
      }
      return and2(...conditions);
    },
    with: {
      bookingsExtrasDetails: {
        with: {
          extras: true
        }
      },
      bookingsServicesDetails: {
        with: {
          services: true
        }
      },
      manicurist: true
    }
  });
  const formattedBookings = bookings2.map((booking) => {
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
        (detail) => detail.services
      ),
      totalPrice: booking.totalPrice,
      advanceAmount: booking.advanceAmount,
      extras: booking.bookingsExtrasDetails.map((detail) => detail.extras),
      manicurist: booking.manicurist.username,
      status: booking.status
    };
  });
  return formattedBookings;
}
async function getBookingById(id) {
  const bookings2 = await db.query.bookings.findMany({
    orderBy: (bookings3, { desc }) => [desc(bookings3.startTime)],
    where: (bookings3, { eq: eq2 }) => eq2(bookings3.id, id),
    with: {
      bookingsExtrasDetails: {
        with: {
          extras: true
        }
      },
      bookingsServicesDetails: {
        with: {
          services: true
        }
      },
      manicurist: true
    },
    limit: 1
  });
  const booking = bookings2[0];
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
    status: booking.status
  };
}
async function getBookingsCount({
  day,
  status
}) {
  let query = db.select({
    count: count()
  }).from(bookings).$dynamic();
  if (day) {
    const start = new Date(day);
    start.setHours(0, 0, 0, 0);
    const end = new Date(day);
    end.setHours(23, 59, 59, 999);
    query = query.where(
      and(
        gte(bookings.startTime, start.toISOString()),
        lte(bookings.startTime, end.toISOString())
      )
    );
  }
  if (status) {
    query = query.where(eq(bookings.status, status));
  }
  const bookingsCount = await query;
  return bookingsCount[0].count;
}
async function getPaginatedBookings({
  page,
  pageSize,
  day,
  status
}) {
  const offset = (page - 1) * pageSize;
  const [bookings2, bookingCount] = await Promise.all([
    getBookings({ offset, limit: pageSize, day, status }),
    getBookingsCount({ day, status })
  ]);
  return {
    data: bookings2,
    count: bookingCount,
    totalPages: Math.ceil(bookingCount / pageSize)
  };
}
async function getUpcomingBookings() {
  const now = /* @__PURE__ */ new Date();
  const bookings2 = await getBookings({
    offset: 0,
    limit: 10,
    day: now
  });
  return bookings2;
}

export { getUpcomingBookings as a, getBookings as b, getBookingById as c, getPaginatedBookings as g };
