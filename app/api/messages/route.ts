import { NextResponse } from "next/server"
import { getMessages } from "@/lib/messages"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const search = searchParams.get("search") || ""
  const account = searchParams.get("account") || ""

  const { messages, totalPages } = await getMessages(page, search, account)

  return NextResponse.json({ messages, totalPages })
}

