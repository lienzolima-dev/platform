import { text, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";

export const extras = sqliteTable("extras", {
  id: text("extra_id").primaryKey().$defaultFn(ulid).notNull(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  description: text("description").notNull(),
});
