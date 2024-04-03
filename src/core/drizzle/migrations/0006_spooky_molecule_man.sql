ALTER TABLE "notifications" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "createdAt" SET DATA TYPE timestamp (6);--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "createdAt" SET DEFAULT current_timestamp(6);--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp (6);--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "updatedAt" SET DEFAULT current_timestamp(6);