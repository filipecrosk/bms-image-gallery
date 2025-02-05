import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

export const db = drizzle(sql, { schema, logger: true });

export const getImages = async () => {
  return db.query.images.findMany();
};
