import { text, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { services } from "./services";
import { bookings } from "./bookings";

export const bookingsServicesDetails = sqliteTable(
  "bookings_services_details",
  {
    idService: text("id_service")
      .notNull()
      .references(() => services.id)
      .notNull(),
    idBooking: text("id_booking")
      .notNull()
      .references(() => bookings.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.idBooking, table.idService] }),
    };
  },
);
