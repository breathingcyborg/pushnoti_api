CREATE TABLE IF NOT EXISTS "fcmTokens" (
	"token" varchar(128) PRIMARY KEY NOT NULL,
	"userId" varchar(128) NOT NULL,
	"createdAt" timestamp (3) DEFAULT current_timestamp(3) NOT NULL,
	"updatedAt" timestamp (3) DEFAULT current_timestamp(3) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fcmTokens" ADD CONSTRAINT "fcmTokens_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
