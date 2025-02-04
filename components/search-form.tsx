"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAccounts } from "@/lib/messages"

export function SearchForm({ initialSearch, initialAccount }: { initialSearch: string; initialAccount: string }) {
  const [search, setSearch] = useState(initialSearch)
  const [account, setAccount] = useState(initialAccount)
  const [accounts, setAccounts] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    getAccounts().then(setAccounts)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateQueryString(search, account)
  }

  const handleAccountChange = (value: string) => {
    setAccount(value)
    updateQueryString(search, value)
  }

  const updateQueryString = (searchValue: string, accountValue: string) => {
    const params = new URLSearchParams(searchParams)
    if (searchValue) params.set("search", searchValue)
    else params.delete("search")
    if (accountValue) params.set("account", accountValue)
    else params.delete("account")
    router.push(`/?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
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
      <button type="submit" className="hidden">
        Search
      </button>
    </form>
  )
}

