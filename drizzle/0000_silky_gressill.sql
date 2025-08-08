CREATE TABLE `users` (
	`id` text PRIMARY KEY DEFAULT 'de7f7f80-44ee-47b3-a579-1b4be0940d76' NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);