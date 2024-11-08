import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";

export const tasks = sqliteTable("tasks", {
  id: text("task_id").primaryKey().$defaultFn(ulid).notNull(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  description: text("description").notNull(),
  status: text("status", { enum: ["completed", "pending", "removed"] })
    .notNull()
    .default("pending"),
});
