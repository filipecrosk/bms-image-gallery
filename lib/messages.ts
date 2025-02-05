import { db } from "@/drizzle/db";
import { images } from "@/drizzle/schema";
import { and, eq, ilike, or, count } from "drizzle-orm";

export interface Message {
  id: number;
  name: string;
  image_url: string;
  account_name: string;
}

export async function getMessages(
  page: number,
  search: string,
  account: string,
  limit: number = 20
): Promise<{ messages: Message[]; totalPages: number }> {
  const offset = (page - 1) * limit;

  let whereClause = undefined;
  const conditions = [];

  if (search) {
    conditions.push(
      or(
        ilike(images.name, `%${search}%`),
        ilike(images.imageUrl, `%${search}%`)
      )
    );
  }

  if (account && account !== "all") {
    conditions.push(eq(images.accountName, account));
  }

  if (conditions.length > 0) {
    whereClause = and(...conditions);
  }

  // Get messages with explicit type casting
  const messages: Message[] = (await db
    .select({
      id: images.id,
      name: images.name,
      image_url: images.imageUrl,
      account_name: images.accountName,
    })
    .from(images)
    .where(whereClause)
    .limit(limit)
    .offset(offset)) as Message[]; // Type assertion since we know these fields are required

  // Get total count with explicit type casting
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
  account: string,
  limit: number = 20
): Promise<number> {
  let whereClause = undefined;
  const conditions = [];

  if (search) {
    conditions.push(
      or(
        ilike(images.name, `%${search}%`),
        ilike(images.imageUrl, `%${search}%`)
      )
    );
  }

  if (account && account !== "all") {
    conditions.push(eq(images.accountName, account));
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
    .selectDistinct({ accountName: images.accountName })
    .from(images);

  return result.map((row) => row.accountName);
}
