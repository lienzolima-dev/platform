import original_config from "../../drizzle.config.ts";
import { type MigrationConfig, readMigrationFiles } from "drizzle-orm/migrator";
import { client as db } from "../db/db.ts";

const config = {
  ...original_config,
  migrationsFolder: original_config.out,
  migrationsTable: original_config.migrations?.table ?? "__drizzle_migrations",
  migrationsSchema: "", // SQLite doesn't use schemas
} as MigrationConfig;

const migrations = readMigrationFiles(config);

const table_name = config.migrationsTable;

async function getDbMigrations() {
  // Ensure the migrations table exists
  await db.execute({
    sql: `
      CREATE TABLE IF NOT EXISTS ${table_name} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hash TEXT NOT NULL UNIQUE,
        created_at INTEGER NOT NULL
      )
    `,
    args: [],
  });

  // Fetch existing migrations
  const result = await db.execute({
    sql: `SELECT hash FROM ${table_name}`,
    args: [],
  });

  return result.rows.map((row) => row.hash as string);
}

async function main() {
  const dbMigrationsHashes = await getDbMigrations();

  for (const migration of migrations) {
    if (!dbMigrationsHashes.includes(migration.hash)) {
      console.log(
        `######## Adding migration to ${table_name}:\n\n${migration.sql}\n\n`,
      );

      // Insert the migration into the migrations table
      await db.execute({
        sql: `INSERT INTO ${table_name} (hash, created_at) VALUES (?, ?)`,
        args: [migration.hash, migration.folderMillis],
      });
    }
  }
}

main()
  .catch((err) => {
    console.error("An error occurred:", err);
  })
  .finally(() => {
    db.close();
    process.exit(0);
  });
