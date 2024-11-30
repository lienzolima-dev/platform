PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_bookings` (
	`booking_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`total_price` real NOT NULL,
	`id_manicurist` text NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`payment_status` text NOT NULL,
	`created_at` text DEFAULT '2024-11-30T20:40:27.775Z' NOT NULL,
	`advance_amount` real DEFAULT 0 NOT NULL,
	FOREIGN KEY (`id_manicurist`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_bookings`("booking_id", "name", "email", "phone", "total_price", "id_manicurist", "start_time", "end_time", "payment_status", "created_at", "advance_amount") SELECT "booking_id", "name", "email", "phone", "total_price", "id_manicurist", "start_time", "end_time", "payment_status", "created_at", "advance_amount" FROM `bookings`;--> statement-breakpoint
DROP TABLE `bookings`;--> statement-breakpoint
ALTER TABLE `__new_bookings` RENAME TO `bookings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_complaints` (
	`complaint_id` text PRIMARY KEY NOT NULL,
	`dni` text NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`date` text DEFAULT '2024-11-30T20:40:27.786Z' NOT NULL,
	`service` text NOT NULL,
	`service_description` text NOT NULL,
	`complaint_option` text NOT NULL,
	`complaint_description` text NOT NULL,
	`adicional_info` text
);
--> statement-breakpoint
INSERT INTO `__new_complaints`("complaint_id", "dni", "full_name", "email", "phone", "date", "service", "service_description", "complaint_option", "complaint_description", "adicional_info") SELECT "complaint_id", "dni", "full_name", "email", "phone", "date", "service", "service_description", "complaint_option", "complaint_description", "adicional_info" FROM `complaints`;--> statement-breakpoint
DROP TABLE `complaints`;--> statement-breakpoint
ALTER TABLE `__new_complaints` RENAME TO `complaints`;--> statement-breakpoint
CREATE TABLE `__new_extras` (
	`extra_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`description` text,
	`status` text DEFAULT 'active' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_extras`("extra_id", "name", "price", "description", "status") SELECT "extra_id", "name", "price", "description", 'active' AS "status" FROM `extras`;--> statement-breakpoint
DROP TABLE `extras`;--> statement-breakpoint
ALTER TABLE `__new_extras` RENAME TO `extras`;--> statement-breakpoint
CREATE TABLE `__new_tasks` (
	`task_id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT '2024-11-30T20:40:27.782Z' NOT NULL,
	`description` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_tasks`("task_id", "created_at", "description", "status") SELECT "task_id", "created_at", "description", "status" FROM `tasks`;--> statement-breakpoint
DROP TABLE `tasks`;--> statement-breakpoint
ALTER TABLE `__new_tasks` RENAME TO `tasks`;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`user_id` text PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`anonymous` integer DEFAULT false NOT NULL,
	`phone` text,
	`username` text NOT NULL,
	`google_id` integer,
	`password_hash` text,
	`avatar_url` text,
	`email` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`verification_code` text,
	`email_verified` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT '2024-11-30T20:40:27.776Z' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("user_id", "status", "anonymous", "phone", "username", "google_id", "password_hash", "avatar_url", "email", "role", "verification_code", "email_verified", "created_at") SELECT "user_id", "status", "anonymous", "phone", "username", "google_id", "password_hash", "avatar_url", "email", "role", "verification_code", "email_verified", "created_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_google_id_unique` ON `users` (`google_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `services` ADD `status` text DEFAULT 'active' NOT NULL;