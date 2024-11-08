import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { services } from "./services";
import { bookings } from "./bookings";

export const bookingsServicesDetails = sqliteTable(
  "bookings_services_details",
  {
    idService: text("id_service")
      .notNull()
      .references(() => services.id, {
        onDelete: "no action",
        onUpdate: "no action",
      })
      .notNull(),
    idBooking: text("id_booking")
      .notNull()
      .references(() => bookings.id, {
        onDelete: "no action",
        onUpdate: "no action",
      })
      .notNull(),
  },
);
