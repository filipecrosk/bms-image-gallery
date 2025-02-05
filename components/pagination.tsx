"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function ItemsPerPageSelect({ limit }: { limit: number }) {
  return (
    <Select 
      defaultValue={limit.toString()} 
      onValueChange={(value) => {
        window.location.href = `/?${new URLSearchParams({
          page: '1',
          limit: value
        }).toString()}`
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Items per page" />
      </SelectTrigger>
      <SelectContent>
        {[10, 20, 50, 100, 200].map((value) => (
          <SelectItem key={value} value={value.toString()}>
            {value} items per page
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function Pagination({ 
  page, 
  totalPages,
  search, 
  account,
  limit = 20 
}: { 
  page: number;
  totalPages: number;
  search: string; 
  account: string;
  limit?: number;
}) {
  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams()
    params.set("page", pageNum.toString())
    if (search) params.set("search", search)
    if (account) params.set("account", account)
    if (limit) params.set("limit", limit.toString())
    return `/?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <div className="flex gap-2">
        {page > 1 && (
          <>
            <Button variant="outline" asChild>
              <Link href={createPageUrl(1)}>First</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={createPageUrl(page - 1)}>Previous</Link>
            </Button>
          </>
        )}
        <span className="self-center">
          Page {page} of {totalPages}
        </span>
        {page < totalPages && (
          <>
            <Button variant="outline" asChild>
              <Link href={createPageUrl(page + 1)}>Next</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={createPageUrl(totalPages)}>Last</Link>
            </Button>
          </>
        )}
      </div>
      <div className="ml-auto">
        <ItemsPerPageSelect limit={limit} />
      </div>
    </div>
  )
}

