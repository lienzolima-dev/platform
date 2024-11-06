import { sql } from "drizzle-orm";
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";

export const users = sqliteTable("users", {
  id: text("user_id").primaryKey().$defaultFn(ulid).notNull(),
  username: text("username").notNull(),
  googleID: integer("google_id").unique(),
  passwordHash: text("password_hash"),
  avatarURL: text("avatar_url"),
  email: text("email").unique().notNull(),
  role: text("role", { enum: ["user", "admin", "manicurist"] })
    .notNull()
    .default("user")
    .notNull(),
  verificationCode: text("verification_code"),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
});
