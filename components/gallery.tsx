import Image from "next/image"
import { getMessages } from "@/lib/messages"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/copy-button"

export async function Gallery({ page, search, account, limit }: { page: number; search: string; account: string; limit: number }) {
  const { messages } = await getMessages(page, search, account, limit)

  if (messages.length === 0) {
    return <div className="mt-8 text-center">No messages found.</div>
  }

  return (
    <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-4 lg:grid-cols-5">
      {messages.map((message) => (
        <Card key={message.id + message.image_url}>
          <CardContent className="p-4">
            <Image
              src={message.image_url || "/placeholder.svg"}
              alt={message.name}
              width={300}
              height={200}
              className="object-contain w-full rounded-md md:h-28 xl:h-68"
              priority
            />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <h2 className="text-xl font-semibold">
              <a href={`https://bms.bri.us/messages/email/${message.id}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline">
                {message.name}
              </a>
            </h2>
            <p className="text-sm text-gray-500">{message.account_name}</p>
            <div className="flex w-full gap-2">
              <Input value={message.image_url} readOnly className="hidden xl:block" />
              <CopyButton text={message.image_url} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

