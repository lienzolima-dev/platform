import type { userRoles } from "../../../db/schemas/users";

export type Task = {
  id: string;
  date: string;
  creationTime: string;
  description: string;
};

export type Booking = {
  startTime: string;
  endTime: string;
  date: string;
  username: string;
  paymentStatus: string;
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
