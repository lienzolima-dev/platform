import { text, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";
import { users } from "./users";

export const bookings = sqliteTable("bookings", {
  id: text("booking_id").primaryKey().$defaultFn(ulid).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  totalPrice: real("total_price").notNull(),
  idManicurist: text("id_manicurist")
    .references(() => users.id, {
      onDelete: "no action",
      onUpdate: "no action",
    })
    .notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  paymentType: text("payment_type"),
});
