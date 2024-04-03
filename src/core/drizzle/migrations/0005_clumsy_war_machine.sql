CREATE TABLE IF NOT EXISTS "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"appId" varchar(10),
	"userId" varchar(128) NOT NULL,
	"title" varchar(255),
	"message" varchar(255),
	"image" varchar(255),
	"createdAt" timestamp (3) DEFAULT current_timestamp(3) NOT NULL,
	"updatedAt" timestamp (3) DEFAULT current_timestamp(3) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notifications" ADD CONSTRAINT "notifications_appId_apps_id_fk" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
