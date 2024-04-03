CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"notimail" varchar DEFAULT null,
	"createdAt" timestamp (3) DEFAULT current_timestamp(3) NOT NULL,
	"updatedAt" timestamp (3) DEFAULT current_timestamp(3) NOT NULL,
	CONSTRAINT "users_notimail_unique" UNIQUE("notimail")
);
