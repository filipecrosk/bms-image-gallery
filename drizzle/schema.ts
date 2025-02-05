import { pgTable, integer, text } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: integer("id"),
  name: text("name"),
  image_url: text("image_url").notNull(),
  account_name: text("account_name").notNull(),
});
