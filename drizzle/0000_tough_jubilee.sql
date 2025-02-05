CREATE TABLE "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"account_name" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "unique_idx" ON "images" USING btree ("image_url");