import { Suspense } from "react"
import { Gallery } from "@/components/gallery"
import { SearchForm } from "@/components/search-form"
import { Pagination } from "@/components/pagination"
import { getTotalPages, getAccounts } from "@/lib/messages"

export default async function Home(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const search = typeof searchParams.search === "string" ? searchParams.search : ""
  const account = typeof searchParams.account === "string" ? searchParams.account : ""
  const limit = typeof searchParams.limit === "string" ? Number.parseInt(searchParams.limit) : 20

  // Fetch accounts and total pages in parallel
  const [totalPages, accounts] = await Promise.all([
    getTotalPages(search, account, limit),
    getAccounts()
  ])

  return (
    <main className="container p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">BMS Image Gallery</h1>
      <SearchForm 
        initialSearch={search} 
        initialAccount={account}
        accounts={accounts}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Gallery page={page} search={search} account={account} limit={limit} />
      </Suspense>
      <Pagination 
        page={page} 
        totalPages={totalPages}
        search={search} 
        account={account} 
        limit={limit} 
      />
    </main>
  )
}

