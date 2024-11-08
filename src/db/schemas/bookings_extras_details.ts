import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { extras } from "./extras";
import { bookings } from "./bookings";

export const bookingsExtrasDetails = sqliteTable("bookings_extras_details", {
  idExtra: text("id_extra")
    .notNull()
    .references(() => extras.id, {
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
});
