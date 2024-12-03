import type { extras, services } from "../../../db/schema";
import type {
  complaintOptions,
  serviceOptions,
} from "../../../db/schemas/complaints";
import type { userRoles } from "../../../db/schemas/users";

export type Task = {
  id: string;
  date: string;
  creationTime: string;
  description: string;
};

export type Booking = {
  id: string;
  startTime: string;
  endTime: string;
  date: Date;
  username: string;
  email: string | null;
  phone: string | null;
  paymentStatus: string;
  advanceAmount: number;
  totalPrice: number;
  services: (typeof services.$inferSelect)[];
  extras: (typeof extras.$inferSelect)[];
  manicurist: string;
};

export type CollaboratorsTableData = {
  id: string;
  name: string;
  email: string;
  role: (typeof userRoles)[number];
  phone: string | null;
};

export type UsersTableData = {
  id: string;
  name: string;
  email: string;
  role: (typeof userRoles)[number];
  phone: string | null;
};

export type ComplaintsTableData = {
  id: string;
  dni: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  service: (typeof serviceOptions)[number];
  serviceDescription: string;
  complaintOption: (typeof complaintOptions)[number];
  complaintDescription: string;
  adicionalInfo: string | null;
};

export type ServicesTableData = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  durationHours: number;
  category: string;
  status: "active" | "deleted";
  formattedDuration?: string;
};

export type ExtrasTableData = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  status: "active" | "deleted";
};
