import { sql } from "drizzle-orm";
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";

export const users = sqliteTable("users", {
  id: text("user_id").primaryKey().$defaultFn(ulid),
  username: text("username"),
  googleID: integer("google_id").unique(),
  password: text("password_hash"),
  avatarURL: text("avatar_url"),
  email: text("email").unique(),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
});
