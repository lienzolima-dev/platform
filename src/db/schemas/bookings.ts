import { text, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { bookingsServicesDetails } from "./bookingsServicesDetails";
import { bookingsExtrasDetails } from "./bookingsExtrasDetails";

export const paymentStatuses = ["advance", "full", "partial", "none"] as const;

export const bookings = sqliteTable("bookings", {
  id: text("booking_id").primaryKey().$defaultFn(ulid).notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  totalPrice: real("total_price").notNull(),
  idManicurist: text("id_manicurist")
    .references(() => users.id)
    .notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  paymentStatus: text("payment_status", {
    enum: ["advance", "full", "partial", "none"],
  }).notNull(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  advanceAmount: real("advance_amount").default(0).notNull(),
});

export const bookingsRelations = relations(bookings, ({ many, one }) => ({
  bookingsServicesDetails: many(bookingsServicesDetails),
  bookingsExtrasDetails: many(bookingsExtrasDetails),
  manicurist: one(users, {
    fields: [bookings.idManicurist],
    references: [users.id],
  }),
}));
