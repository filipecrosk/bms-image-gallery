'use client'
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchForm({ initialSearch = "", initialAccount = "", accounts = [] }: { initialSearch?: string; initialAccount?: string; accounts: string[] }) {
  const [search, setSearch] = useState(initialSearch)
  const [account, setAccount] = useState(initialAccount)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (value: string) => {
    setSearch(value)
    const params = new URLSearchParams(searchParams)
    if (value) params.set('search', value)
    else params.delete('search')
    params.set('page', '1')
    router.push(`/?${params.toString()}`)
  }

  const handleAccountChange = (value: string) => {
    setAccount(value)
    const params = new URLSearchParams(searchParams)
    if (value && value !== 'all') params.set('account', value)
    else params.delete('account')
    params.set('page', '1')
    router.push(`/?${params.toString()}`)
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSearch(search) }} className="flex gap-4 mb-6">
      <Input
        type="search"
        placeholder="Search by name or URL"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow"
      />
      <Select value={account} onValueChange={handleAccountChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by account" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Accounts</SelectItem>
          {accounts.map((acc) => (
            <SelectItem key={acc} value={acc}>
              {acc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button type="submit" className="hidden">Search</button>
    </form>
  )
}

