import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

import { users } from "./users";

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, {
      onDelete: "no action",
      onUpdate: "no action",
    })
    .notNull(),
  expiresAt: integer("expires_at").notNull(),
  // expiresAt: text("expires_at").notNull().default(sql`(current_timestamp)`),
});
