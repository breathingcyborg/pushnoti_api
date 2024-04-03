CREATE TABLE IF NOT EXISTS "apps" (
	"id" varchar(10) PRIMARY KEY NOT NULL,
	"displayName" varchar NOT NULL,
	"apiKey" varchar(20) NOT NULL,
	"userId" varchar(128) NOT NULL,
	"createdAt" timestamp (3) DEFAULT current_timestamp(3) NOT NULL,
	"updatedAt" timestamp (3) DEFAULT current_timestamp(3) NOT NULL,
	CONSTRAINT "apps_apiKey_unique" UNIQUE("apiKey")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "apps" ADD CONSTRAINT "apps_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
