CREATE TABLE `users` (
	`id` text PRIMARY KEY DEFAULT 'e1917958-de46-47a2-806a-ba7d9ad9f75f' NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text DEFAULT '08/08/2025',
	`updated_at` text DEFAULT '08/08/2025'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);