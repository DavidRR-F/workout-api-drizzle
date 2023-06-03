CREATE TABLE IF NOT EXISTS "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"sets" integer DEFAULT 3,
	"reps" integer DEFAULT 12,
	"rep_range_top" integer DEFAULT 12,
	"rep_range_bottom" integer DEFAULT 8,
	"weight" double precision DEFAULT 0,
	"weight_increase" double precision DEFAULT 2.5,
	"workout_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workouts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workout_id_workouts_id_fk" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workouts" ADD CONSTRAINT "workouts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
