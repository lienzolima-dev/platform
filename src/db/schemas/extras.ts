import { relations } from "drizzle-orm";
import { text, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";
import { bookingsExtrasDetails } from "./bookingsExtrasDetails";

export const extras = sqliteTable("extras", {
  id: text("extra_id").primaryKey().$defaultFn(ulid).notNull(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  description: text("description"),
  status: text("status", { enum: ["active", "deleted"] })
    .notNull()
    .default("active"),
});

export const extrasRelations = relations(extras, ({ many }) => ({
  bookingsExtrasDetails: many(bookingsExtrasDetails),
}));
