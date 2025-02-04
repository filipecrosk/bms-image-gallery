import { db } from "@/drizzle/db";
import { images } from "@/drizzle/schema";
import { and, eq, ilike, or, count } from "drizzle-orm";
import { sql } from "@vercel/postgres";

export interface Message {
  id: number;
  name: string;
  image_url: string;
  account_name: string;
}

export async function getMessages(
  page: number,
  search: string,
  account: string
): Promise<{ messages: Message[]; totalPages: number }> {
  const limit = 12;
  const offset = (page - 1) * limit;

  let whereClause = undefined;
  const conditions = [];

  if (search) {
    conditions.push(
      or(
        ilike(images.name, `%${search}%`),
        ilike(images.image_url, `%${search}%`)
      )
    );
  }

  if (account) {
    conditions.push(eq(images.account_name, account));
  }

  if (conditions.length > 0) {
    whereClause = and(...conditions);
  }

  // Get messages
  const messages = await db
    .select()
    .from(images)
    .where(whereClause)
    .limit(limit)
    .offset(offset);

  // Get total count
  const countResult = await db
    .select({
      count: count(),
    })
    .from(images)
    .where(whereClause);

  const totalCount = Number(countResult[0].count);

  const totalPages = Math.ceil(totalCount / limit);

  return { messages, totalPages };
}

export async function getTotalPages(
  search: string,
  account: string
): Promise<number> {
  const limit = 12;

  let whereClause = undefined;
  const conditions = [];

  if (search) {
    conditions.push(
      or(
        ilike(images.name, `%${search}%`),
        ilike(images.image_url, `%${search}%`)
      )
    );
  }

  if (account) {
    conditions.push(eq(images.account_name, account));
  }

  if (conditions.length > 0) {
    whereClause = and(...conditions);
  }

  const countResult = await db
    .select({
      count: count(),
    })
    .from(images)
    .where(whereClause);

  const totalCount = Number(countResult[0].count);

  return Math.ceil(totalCount / limit);
}

export async function getAccounts(): Promise<string[]> {
  const result = await db
    .select({
      account_name: images.account_name,
    })
    .from(images)
    .groupBy(images.account_name);

  return result.map((row) => row.account_name);
}
