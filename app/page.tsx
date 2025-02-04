import { Suspense } from "react"
import { Gallery } from "@/components/gallery"
import { SearchForm } from "@/components/search-form"
import { Pagination } from "@/components/pagination"

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const search = typeof searchParams.search === "string" ? searchParams.search : ""
  const account = typeof searchParams.account === "string" ? searchParams.account : ""

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Image Gallery</h1>
      <SearchForm initialSearch={search} initialAccount={account} />
      <Suspense fallback={<div>Loading...</div>}>
        <Gallery page={page} search={search} account={account} />
      </Suspense>
      <Pagination page={page} search={search} account={account} />
    </main>
  )
}

