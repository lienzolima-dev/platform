CREATE TABLE `bookings` (
	`booking_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`total_price` real NOT NULL,
	`id_manicurist` text NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`payment_status` text NOT NULL,
	`created_at` text DEFAULT '2024-11-30T19:43:38.959Z' NOT NULL,
	`advance_amount` real DEFAULT 0 NOT NULL,
	FOREIGN KEY (`id_manicurist`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bookings_extras_details` (
	`id_extra` text NOT NULL,
	`id_booking` text NOT NULL,
	PRIMARY KEY(`id_booking`, `id_extra`),
	FOREIGN KEY (`id_extra`) REFERENCES `extras`(`extra_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_booking`) REFERENCES `bookings`(`booking_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bookings_services_details` (
	`id_service` text NOT NULL,
	`id_booking` text NOT NULL,
	PRIMARY KEY(`id_booking`, `id_service`),
	FOREIGN KEY (`id_service`) REFERENCES `services`(`service_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_booking`) REFERENCES `bookings`(`booking_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `complaints` (
	`complaint_id` text PRIMARY KEY NOT NULL,
	`dni` text NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`date` text DEFAULT '2024-11-30T19:43:38.970Z' NOT NULL,
	`service` text NOT NULL,
	`service_description` text NOT NULL,
	`complaint_option` text NOT NULL,
	`complaint_description` text NOT NULL,
	`adicional_info` text
);
--> statement-breakpoint
CREATE TABLE `extras` (
	`extra_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `services` (
	`service_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`description` text,
	`duration_hours` real NOT NULL,
	`category` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`task_id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT '2024-11-30T19:43:38.966Z' NOT NULL,
	`description` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
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
	`created_at` text DEFAULT '2024-11-30T19:43:38.960Z' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_google_id_unique` ON `users` (`google_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);