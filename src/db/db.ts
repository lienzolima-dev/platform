import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const DB_FILE_NAME = import.meta.env
  ? import.meta.env.DB_FILE_NAME
  : process.env.DB_FILE_NAME;

if (!DB_FILE_NAME) {
  throw new Error("DB_FILE_NAME is not set");
}

export const client = createClient({
  url: DB_FILE_NAME,
});

export const db = drizzle(client);
