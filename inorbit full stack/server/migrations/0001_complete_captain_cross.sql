CREATE TABLE IF NOT EXISTS "objetivos_concluidos" (
	"id" text PRIMARY KEY NOT NULL,
	"meta_id" text NOT NULL,
	"cridado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "objetivos_concluidos" ADD CONSTRAINT "objetivos_concluidos_meta_id_objetivos_id_fk" FOREIGN KEY ("meta_id") REFERENCES "public"."objetivos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
