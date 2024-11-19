import { text, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { services } from "./services";
import { bookings } from "./bookings";
import { relations } from "drizzle-orm";

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

export const bookingsServicesDetailsRelations = relations(
  bookingsServicesDetails,
  ({ one }) => ({
    bookings: one(bookings, {
      fields: [bookingsServicesDetails.idBooking],
      references: [bookings.id],
    }),
    services: one(services, {
      fields: [bookingsServicesDetails.idService],
      references: [services.id],
    }),
  }),
);
