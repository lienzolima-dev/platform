import { and, eq, not } from "drizzle-orm";
import { complaints } from "../../../db/schema";
import { db } from "../../../db/db";
import type { ComplaintsTableData } from "./types";

export async function getComplaintsTableData(): Promise<ComplaintsTableData[]> {
  const complaintsData = await db
    .select({
      id: complaints.id,
      dni: complaints.dni,
      fullName: complaints.fullName,
      email: complaints.email,
      phone: complaints.phone,
      date: complaints.date,
      service: complaints.service,
      serviceDescription: complaints.serviceDescription,
      complaintOption: complaints.complaintOption,
      complaintDescription: complaints.complaintDescription,
      adicionalInfo: complaints.adicionalInfo,
    })
    .from(complaints)
    .orderBy(complaints.date);
  return complaintsData;
}
