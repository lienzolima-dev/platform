import type { APIContext } from "astro";
import { getBookings } from "../../admin/_db/bookings";
import { utils, write } from "xlsx";
import type { Booking } from "../../admin/_db/types";
import {
  getBookingStatusLabel,
  getPaymentStatusLabel,
} from "../../../db/schemas/bookings";

/**
 * Transforms a list of booking objects into a two-dimensional array of strings (matrix),
 * where the first row is a set of headers and each subsequent row represents one booking.
 *
 * @example
 * const bookings = [
 *   {
 *     id: "1",
 *     username: "Alice",
 *     email: "alice@example.com",
 *     date: new Date(),
 *     status: "confirmed",
 *     services: [{ name: "Manicure" }, { name: "Pedicure" }],
 *     extras: [{ name: "Nail Art" }],
 *     manicurist: "Maria",
 *     phone: "555-1234",
 *     totalPrice: 50,
 *     advanceAmount: 20,
 *     paymentStatus: "paid",
 *     startTime: "10:00",
 *     endTime: "11:00",
 *   }
 * ];
 *
 * const matrix = getBookingsMatrix(bookings);
 * // Example output:
 * // [
 * //   ["ID", "NOMBRE", "EMAIL", "FECHA", "ESTADO", "SERVICIOS", "EXTRAS", "MANICURISTA", "TELÉFONO", "PRECIO TOTAL", "ADELANTO", "TIPO DE PAGO", "HORA DE INICIO", "HORA DE FIN"],
 * //   ["1", "Alice", "alice@example.com", "31/01/2024", "Finalizado", "Manicure, Pedicure", "Nail Art", "Maria", "123123123", "50", "20", "Pagado", "10:00", "11:00"]
 * // ]
 */
function getBookingsMatrix(bookings: Booking[]): string[][] {
  const headers = [
    "ID",
    "NOMBRE",
    "EMAIL",
    "FECHA",
    "ESTADO",
    "SERVICIOS",
    "EXTRAS",
    "MANICURISTA",
    "TELÉFONO",
    "PRECIO TOTAL",
    "ADELANTO",
    "TIPO DE PAGO",
    "HORA DE INICIO",
    "HORA DE FIN",
  ];

  const data = bookings.reduce<string[][]>((acc, booking) => {
    const services = booking.services.map((service) => service.name).join(", ");
    const extras = booking.extras.map((extra) => extra.name).join(", ");

    const row = [
      booking.id,
      booking.username,
      booking.email ?? "",
      booking.date.toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      getBookingStatusLabel(booking.status),
      services,
      extras,
      booking.manicurist,
      booking.phone ?? "",
      booking.totalPrice.toString(),
      booking.advanceAmount.toString(),
      getPaymentStatusLabel(booking.paymentStatus),
      booking.startTime,
      booking.endTime,
    ];

    acc.push(row);
    return acc;
  }, []);

  return [headers, ...data];
}

export async function GET(_context: APIContext): Promise<Response> {
  const bookings = await getBookings({});

  const matrixData = getBookingsMatrix(bookings);

  const sheet = utils.aoa_to_sheet(matrixData);
  const workBook = utils.book_new();

  utils.book_append_sheet(workBook, sheet, "MockData");

  const buffer = write(workBook, {
    type: "buffer",
  });

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="mock_data.xlsx"',
      "Content-Length": buffer.byteLength.toString(),
    },
  });
}
