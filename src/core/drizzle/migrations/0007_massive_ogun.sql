ALTER TABLE "notifications" ALTER COLUMN "createdAt" SET DATA TYPE timestamp(3);--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "createdAt" SET DEFAULT current_timestamp(3);--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp(3);--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "updatedAt" SET DEFAULT current_timestamp(3);