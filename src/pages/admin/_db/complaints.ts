import { complaints } from "../../../db/schema";
import { db } from "../../../db/db";
import type { ComplaintsTableData } from "./types";

export async function getComplaintsTableData(): Promise<ComplaintsTableData[]> {
  const complaintsData = await db
    .select()
    .from(complaints)
    .orderBy(complaints.date);
  return complaintsData;
}