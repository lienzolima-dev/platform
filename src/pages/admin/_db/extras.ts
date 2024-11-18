import type { SelectOption } from "../../../components/global/form/types";
import { db } from "../../../db/db";
import { extras } from "../../../db/schema";

export async function getExtras(): Promise<(typeof extras.$inferSelect)[]> {
  const data = await db.select().from(extras);
  return data;
}

export async function getExtrasOptions(): Promise<SelectOption[]> {
  const extras = await getExtras();
  return extras.map((extra) => ({
    value: extra.id,
    label: extra.name,
  }));
}
