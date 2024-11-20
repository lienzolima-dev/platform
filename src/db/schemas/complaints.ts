import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";

export const serviceOptions = [
  "Sistemas",
  "Uña natural",
  "Retiros",
  "Retoques",
  "Adicional",
] as const;
export const complaintOptions = ["claim", "complaint"] as const;

export const complaints = sqliteTable("complaints", {
  id: text("complaint_id").primaryKey().$defaultFn(ulid).notNull(),
  dni: text("dni").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  date: text("date").notNull().default(new Date().toISOString()),
  service: text("service", { enum: serviceOptions }).notNull(),
  serviceDescription: text("service_description").notNull(),
  complaintOption: text("complaint_option", {
    enum: complaintOptions,
  }).notNull(),
  complaintDescription: text("complaint_description").notNull(),
  adicionalInfo: text("adicional_info"),
});
