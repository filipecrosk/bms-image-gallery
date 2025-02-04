import Image from "next/image"
import { getMessages } from "@/lib/messages"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/copy-button"

export async function Gallery({ page, search, account }: { page: number; search: string; account: string }) {
  const { messages, totalPages } = await getMessages(page, search, account)

  if (messages.length === 0) {
    return <div className="text-center mt-8">No messages found.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {messages.map((message) => (
        <Card key={message.id}>
          <CardContent className="p-4">
            <Image
              src={message.image_url || "/placeholder.svg"}
              alt={message.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-md"
            />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <h2 className="text-xl font-semibold">{message.name}</h2>
            <p className="text-sm text-gray-500">{message.account_name}</p>
            <div className="flex w-full gap-2">
              <Input value={message.image_url} readOnly />
              <CopyButton text={message.image_url} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

