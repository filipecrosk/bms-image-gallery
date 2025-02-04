import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getTotalPages } from "@/lib/messages"

export async function Pagination({ page, search, account }: { page: number; search: string; account: string }) {
  const totalPages = await getTotalPages(search, account)

  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams()
    params.set("page", pageNum.toString())
    if (search) params.set("search", search)
    if (account) params.set("account", account)
    return `/?${params.toString()}`
  }

  return (
    <div className="flex justify-center gap-2 mt-8">
      {page > 1 && (
        <Button variant="outline" asChild>
          <Link href={createPageUrl(page - 1)}>Previous</Link>
        </Button>
      )}
      <span className="self-center">
        Page {page} of {totalPages}
      </span>
      {page < totalPages && (
        <Button variant="outline" asChild>
          <Link href={createPageUrl(page + 1)}>Next</Link>
        </Button>
      )}
    </div>
  )
}

