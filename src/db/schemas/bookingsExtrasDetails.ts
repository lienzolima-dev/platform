import { text, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { extras } from "./extras";
import { bookings } from "./bookings";

export const bookingsExtrasDetails = sqliteTable(
  "bookings_extras_details",
  {
    idExtra: text("id_extra")
      .notNull()
      .references(() => extras.id)
      .notNull(),
    idBooking: text("id_booking")
      .notNull()
      .references(() => bookings.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.idBooking, table.idExtra] }),
    };
  },
);
