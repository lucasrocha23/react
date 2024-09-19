CREATE TABLE IF NOT EXISTS "objetivos" (
	"id" text PRIMARY KEY NOT NULL,
	"titulo" text NOT NULL,
	"frequencia_semanal" integer NOT NULL,
	"cridado_em" timestamp with time zone DEFAULT now() NOT NULL
);
