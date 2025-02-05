"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function CopyButton({ text }: { text: string }) {
  const [copying, setCopying] = useState(false)
  const { toast } = useToast()

  const handleCopy = async () => {
    setCopying(true)
    await navigator.clipboard.writeText(text)
    toast({
      title: "URL copiada",
      description: "A URL foi copiada para a área de transferência.",
    })
    setCopying(false)
  }

  return (
    <Button onClick={handleCopy} disabled={copying} className="cursor-pointer hover:bg-gray-100 hover:text-gray-900">
      {copying ? "Copiando..." : "Copiar URL"}
    </Button>
  )
}

