import { Suspense } from "react"
import { Gallery } from "@/components/gallery"
import { SearchForm } from "@/components/search-form"
import { Pagination } from "@/components/pagination"

export default async function Home(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const search = typeof searchParams.search === "string" ? searchParams.search : ""
  const account = typeof searchParams.account === "string" ? searchParams.account : ""

  return (
    <main className="container p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Image Gallery</h1>
      <SearchForm initialSearch={search} initialAccount={account} />
      <Suspense fallback={<div>Loading...</div>}>
        <Gallery page={page} search={search} account={account} />
      </Suspense>
      <Pagination page={page} search={search} account={account} />
    </main>
  )
}

