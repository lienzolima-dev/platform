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