import { complaints as complaintsTable } from "../../schema";
import { db } from "../../db";

type complaintInsertType = typeof complaintsTable.$inferInsert;

export async function seedComplaints(complaints: complaintInsertType[]) {
  try {
    await db.insert(complaintsTable).values(complaints);
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
}
