import { text, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";

export const services = sqliteTable("services", {
  id: text("service_id").primaryKey().$defaultFn(ulid).notNull(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  description: text("description"),
  durationHours: real("duration_hours").notNull(),
  category: text("category").notNull(),
});
