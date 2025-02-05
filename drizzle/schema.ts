import { pgTable, integer, text } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: integer(),
  name: text(),
  imageUrl: text("image_url").notNull(),
  accountName: text("account_name").notNull(),
});
