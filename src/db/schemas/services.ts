import { relations } from "drizzle-orm";
import { text, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";
import { bookingsServicesDetails } from "./bookingsServicesDetails";

export const services = sqliteTable("services", {
  id: text("service_id").primaryKey().$defaultFn(ulid).notNull(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  description: text("description"),
  durationHours: real("duration_hours").notNull(),
  category: text("category").notNull(),
  status: text("status", { enum: ["active", "deleted"] })
    .notNull()
    .default("active"),
});

export const servicesRelations = relations(services, ({ many }) => ({
  bookingsServicesDetails: many(bookingsServicesDetails),
}));
