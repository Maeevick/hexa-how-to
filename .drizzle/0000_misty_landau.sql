CREATE TABLE "characters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"attack" integer NOT NULL,
	"defense" integer NOT NULL,
	"health" integer NOT NULL
);
