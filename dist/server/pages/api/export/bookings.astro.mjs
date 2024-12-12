import { b as getBookings } from '../../../chunks/bookings_Ctd4NecC.mjs';
import { utils, write } from 'xlsx';
import { a as getBookingStatusLabel, g as getPaymentStatusLabel } from '../../../chunks/db_DooF3xjr.mjs';
export { r as renderers } from '../../../chunks/_@astro-renderers_BpdHmnqV.mjs';

function getBookingsMatrix(bookings) {
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
    "HORA DE FIN"
  ];
  const data = bookings.reduce((acc, booking) => {
    const services = booking.services.map((service) => service.name).join(", ");
    const extras = booking.extras.map((extra) => extra.name).join(", ");
    const row = [
      booking.id,
      booking.username,
      booking.email ?? "",
      booking.date.toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
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
      booking.endTime
    ];
    acc.push(row);
    return acc;
  }, []);
  return [headers, ...data];
}
async function GET(_context) {
  const bookings = await getBookings({});
  const matrixData = getBookingsMatrix(bookings);
  const sheet = utils.aoa_to_sheet(matrixData);
  const workBook = utils.book_new();
  utils.book_append_sheet(workBook, sheet, "MockData");
  const buffer = write(workBook, {
    type: "buffer"
  });
  const date = /* @__PURE__ */ new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const dateString = `${day}-${month}-${year}`;
  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="reservas-${dateString}.xlsx"`,
      "Content-Length": buffer.byteLength.toString()
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
