import { extras as extrasTable } from "../../schema";
import { db } from "../../db";

type extraInsertType = typeof extrasTable.$inferInsert;

export async function seedExtras(extras: extraInsertType[]) {
  try {
    await db.insert(extrasTable).values(extras);
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
}
