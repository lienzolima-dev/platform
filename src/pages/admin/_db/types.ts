import type { extras, services } from "../../../db/schema";
import {
  bookingStatuses,
  type paymentStatuses,
} from "../../../db/schemas/bookings";
import type {
  complaintOptions,
  serviceOptions,
} from "../../../db/schemas/complaints";
import type { userRoles } from "../../../db/schemas/users";

export type BookingStatus = (typeof bookingStatuses)[number];

// This function checks if a given string is a valid booking status.
export function isBookingStatus(status: string): status is BookingStatus {
  return (bookingStatuses as readonly string[]).includes(status);
}

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
  paymentStatus: (typeof paymentStatuses)[number];
  advanceAmount: number;
  totalPrice: number;
  services: (typeof services.$inferSelect)[];
  extras: (typeof extras.$inferSelect)[];
  manicurist: string;
  status: (typeof bookingStatuses)[number];
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
