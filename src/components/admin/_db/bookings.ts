import { db } from "../../../db/db";
import { bookings } from "../../../db/schemas/bookings";

type Booking = {
  startTime: string;
  endTime: string;
  date: string;
  username: string;
  paymentStatus: string;
};

// async function getCurrentDateTimeFromAPI(): Promise<Date> {
//   try {
//     const response = await fetch(
//       "https://timeapi.io/api/Time/current/zone?timeZone=America/Lima",
//     );
//     const data = await response.json();
//     const currentTime = new Date(data.dateTime);
//     return currentTime;
//   } catch (error) {
//     console.error(
//       "Error fetching time from TimeAPI, using server time as fallback.",
//       error,
//     );
//     return new Date();
//   }
// }

function formatBookingData(booking: {
  startTime: string;
  endTime: string;
  name: string;
  paymentStatus: string;
}): Booking {
  const startTime = booking.startTime
    ? new Date(booking.startTime).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const endTime = booking.endTime
    ? new Date(booking.endTime).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const date = booking.startTime
    ? new Date(booking.startTime).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
      })
    : "";

  return {
    startTime,
    endTime,
    date,
    username: booking.name,
    paymentStatus: formatPaymentStatus(booking.paymentStatus),
  };
}

function formatPaymentStatus(paymentStatus: string): string {
  switch (paymentStatus) {
    case "advance":
      return "Adelanto";
    case "full":
      return "Pago completo";
    case "partial":
      return "Pago Parcial";
    case "none":
      return "Sin Adelanto";
    default:
      return paymentStatus;
  }
}

export const getAllBookings = async (): Promise<Booking[]> => {
  const now = new Date();
  now.getTime();

  const bookingsList = await db
    .select({
      startTime: bookings.startTime,
      endTime: bookings.endTime,
      name: bookings.name,
      paymentStatus: bookings.paymentStatus,
    })
    .from(bookings)
    .orderBy(bookings.startTime);

  const upcomingBookings = bookingsList
    .filter((booking) => {
      const bookingDate = new Date(booking.startTime);
      return bookingDate > now;
    })
    .slice(0, 5)
    .map(formatBookingData);

  return upcomingBookings;
};
