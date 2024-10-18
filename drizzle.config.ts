import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const DB_FILE_NAME = process.env.DB_FILE_NAME;

if (!DB_FILE_NAME) {
  throw new Error("DB_FILE_NAME is not set");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: DB_FILE_NAME,
  },
});
