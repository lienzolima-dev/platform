import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "../db/db";
import { sessions } from "../db/schemas/sessions";
import { users } from "../db/schemas/users";

export const adapter = new DrizzleSQLiteAdapter(db, sessions, users);
