import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { relations } from 'drizzle-orm';
import { sqliteTable, text, real, primaryKey, integer } from 'drizzle-orm/sqlite-core';
import { ulid } from 'ulid';
import { c as complaints } from './complaints_DeMGL233.mjs';

const services = sqliteTable("services", {
  id: text("service_id").primaryKey().$defaultFn(ulid).notNull(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  description: text("description"),
  durationHours: real("duration_hours").notNull(),
  category: text("category").notNull(),
  status: text("status", { enum: ["active", "deleted"] }).notNull().default("active")
});
const servicesRelations = relations(services, ({ many }) => ({
  bookingsServicesDetails: many(bookingsServicesDetails)
}));

const bookingsServicesDetails = sqliteTable(
  "bookings_services_details",
  {
    idService: text("id_service").notNull().references(() => services.id).notNull(),
    idBooking: text("id_booking").notNull().references(() => bookings.id).notNull()
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.idBooking, table.idService] })
    };
  }
);
const bookingsServicesDetailsRelations = relations(
  bookingsServicesDetails,
  ({ one }) => ({
    bookings: one(bookings, {
      fields: [bookingsServicesDetails.idBooking],
      references: [bookings.id]
    }),
    services: one(services, {
      fields: [bookingsServicesDetails.idService],
      references: [services.id]
    })
  })
);

const extras = sqliteTable("extras", {
  id: text("extra_id").primaryKey().$defaultFn(ulid).notNull(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  description: text("description"),
  status: text("status", { enum: ["active", "deleted"] }).notNull().default("active")
});
const extrasRelations = relations(extras, ({ many }) => ({
  bookingsExtrasDetails: many(bookingsExtrasDetails)
}));

const bookingsExtrasDetails = sqliteTable(
  "bookings_extras_details",
  {
    idExtra: text("id_extra").notNull().references(() => extras.id).notNull(),
    idBooking: text("id_booking").notNull().references(() => bookings.id).notNull()
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.idBooking, table.idExtra] })
    };
  }
);
const bookingsExtrasDetailsRelations = relations(
  bookingsExtrasDetails,
  ({ one }) => ({
    bookings: one(bookings, {
      fields: [bookingsExtrasDetails.idBooking],
      references: [bookings.id]
    }),
    extras: one(extras, {
      fields: [bookingsExtrasDetails.idExtra],
      references: [extras.id]
    })
  })
);

const paymentStatuses = ["advance", "full", "partial", "none"];
const bookingStatuses = ["pending", "finished", "cancelled"];
function getPaymentStatusLabel(paymentStatus) {
  if (paymentStatus === "advance") return "Adelanto";
  if (paymentStatus === "full") return "Pago completo";
  if (paymentStatus === "partial") return "Pago Parcial";
  if (paymentStatus === "none") return "Sin Adelanto";
  return paymentStatus;
}
function getBookingStatusLabel(bookingStatus) {
  if (bookingStatus === "pending") return "Pendiente";
  if (bookingStatus === "finished") return "Finalizado";
  if (bookingStatus === "cancelled") return "Cancelado";
  return bookingStatus;
}
const bookings = sqliteTable("bookings", {
  id: text("booking_id").primaryKey().$defaultFn(ulid).notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  totalPrice: real("total_price").notNull(),
  idManicurist: text("id_manicurist").references(() => users.id).notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  paymentStatus: text("payment_status", {
    enum: paymentStatuses
  }).notNull(),
  createdAt: text("created_at").notNull().default((/* @__PURE__ */ new Date()).toISOString()),
  advanceAmount: real("advance_amount").default(0).notNull(),
  status: text("status", {
    enum: bookingStatuses
  }).default("pending").notNull()
});
const bookingsRelations = relations(bookings, ({ many, one }) => ({
  bookingsServicesDetails: many(bookingsServicesDetails),
  bookingsExtrasDetails: many(bookingsExtrasDetails),
  manicurist: one(users, {
    fields: [bookings.idManicurist],
    references: [users.id]
  })
}));

const userRoles = ["user", "admin", "manicurist"];
const users = sqliteTable("users", {
  id: text("user_id").primaryKey().$defaultFn(ulid).notNull(),
  status: text("status", { enum: ["active", "inactive", "deleted"] }).notNull().default("active"),
  anonymous: integer("anonymous", { mode: "boolean" }).notNull().default(false),
  phone: text("phone"),
  username: text("username").notNull(),
  googleID: integer("google_id").unique(),
  passwordHash: text("password_hash"),
  avatarURL: text("avatar_url"),
  email: text("email").unique().notNull(),
  role: text("role", { enum: userRoles }).notNull().default("user").notNull(),
  verificationCode: text("verification_code"),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().default((/* @__PURE__ */ new Date()).toISOString())
});
const userRelations = relations(users, ({ many }) => ({
  bookings: many(bookings)
}));

const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, {
    onDelete: "no action",
    onUpdate: "no action"
  }).notNull(),
  expiresAt: integer("expires_at").notNull()
  // expiresAt: text("expires_at").notNull().default(sql`(current_timestamp)`),
});

const tasks = sqliteTable("tasks", {
  id: text("task_id").primaryKey().$defaultFn(ulid).notNull(),
  createdAt: text("created_at").notNull().default((/* @__PURE__ */ new Date()).toISOString()),
  description: text("description").notNull(),
  status: text("status", { enum: ["completed", "pending", "removed"] }).notNull().default("pending")
});

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  bookings,
  bookingsExtrasDetails,
  bookingsExtrasDetailsRelations,
  bookingsRelations,
  bookingsServicesDetails,
  bookingsServicesDetailsRelations,
  complaints,
  extras,
  extrasRelations,
  services,
  servicesRelations,
  sessions,
  tasks,
  userRelations,
  users
}, Symbol.toStringTag, { value: 'Module' }));

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const DB_FILE_NAME = Object.assign(__vite_import_meta_env__, { DB_FILE_NAME: "file:local.db", _: process.env._ }) ? "file:local.db" : process.env.DB_FILE_NAME;
if (!DB_FILE_NAME) {
  throw new Error("DB_FILE_NAME is not set");
}
const client = createClient({
  url: DB_FILE_NAME
});
const db = drizzle(client, {
  schema
});

export { getBookingStatusLabel as a, bookingStatuses as b, bookings as c, db as d, extras as e, bookingsServicesDetails as f, getPaymentStatusLabel as g, bookingsExtrasDetails as h, userRoles as i, sessions as j, paymentStatuses as p, services as s, tasks as t, users as u };
