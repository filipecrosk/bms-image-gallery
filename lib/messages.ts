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

  let query = sql`SELECT * FROM images WHERE 1=1`;

  if (search) {
    query = sql`${query} AND (name ILIKE ${`%${search}%`} OR image_url ILIKE ${`%${search}%`})`;
  }

  if (account) {
    query = sql`${query} AND account_name = ${account}`;
  }

  // query = sql`${query} LIMIT ${limit} OFFSET ${offset}`;

  console.log('query', query);
  const result = await query;

  // Count query
  let countQuery = sql`SELECT COUNT(*) as count FROM images WHERE 1=1`;

  if (search) {
    countQuery = sql`${countQuery} AND (name ILIKE ${`%${search}%`} OR image_url ILIKE ${`%${search}%`})`;
  }

  if (account) {
    countQuery = sql`${countQuery} AND account_name = ${account}`;
  }

  const countResult = await countQuery;
  const count = Number(countResult.rows[0].count);
  const totalPages = Math.ceil(count / limit);

  return { messages: result.rows, totalPages };
}

export async function getTotalPages(
  search: string,
  account: string
): Promise<number> {
  const limit = 12;
  let query = sql`SELECT COUNT(*) as count FROM images WHERE 1=1`;

  if (search) {
    query = sql`${query} AND (name ILIKE ${`%${search}%`} OR image_url ILIKE ${`%${search}%`})`;
  }

  if (account) {
    query = sql`${query} AND account_name = ${account}`;
  }

  const result = await query;
  const count = Number(result.rows[0].count);
  return Math.ceil(count / limit);
}

export async function getAccounts(): Promise<string[]> {
  const result = await sql`SELECT DISTINCT account_name FROM images`;
  return result.rows.map((row: any) => row.account_name);
}

