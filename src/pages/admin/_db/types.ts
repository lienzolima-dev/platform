import type { extras, services } from "../../../db/schema";
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
