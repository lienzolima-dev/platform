import { tasks as tasksTable } from "../../schema";
import { db } from "../../db";

type taskInsertType = typeof tasksTable.$inferInsert;

export async function seedTask(tasks: taskInsertType[]) {
  try {
    await db.insert(tasksTable).values(tasks);
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
}
