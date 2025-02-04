import { pgTable, serial, text, uniqueIndex } from "drizzle-orm/pg-core";

export const images = pgTable(
  "images",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    image_url: text("image_url").notNull(),
    account_name: text("account_name").notNull(),
  },
  (images) => [uniqueIndex("unique_idx").on(images.image_url)]
);
