

import { EllipsisVertical } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

import { formatChatTime } from "@/components/shared/FormatChatTime "
import { imageUrl } from "@/constants"
import getProfile from "@/utils/getProfile"
import ChatBoxFooter from "./ChatBoxFooter"
import ImageViewer from "@/components/shared/ImageViewer"

const ChatABox = async ({ messages }: any) => {
  const user = await getProfile();

  return (
    <div className="flex-1 h-full min-h-[70vh] max-h-[70vh]  bg-white flex flex-col rounded-2xl">

      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/images/avatar4.png" />
            <AvatarFallback>OR</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="font-semibold text-lg">Olivia Richards</h2>
            <Badge variant="outline">Influencer</Badge>
          </div>
        </div>

        <EllipsisVertical size={20} className="text-gray-600" />
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-6 py-4 overflow-y-auto">
        {messages?.map((m: any) => {
          const isSent = m?.sender?._id === user?._id

          return (
            <div
              key={m?._id}
              className={`flex ${isSent ? "justify-end" : "justify-start"} mb-4`}
            >
              <div className="max-w-[70%]">
                {!isSent && (
                  <Avatar className="w-8 h-8 mb-1">
                    <AvatarImage src={`${imageUrl}${m?.sender?.image}`} />
                    <AvatarFallback>{m?.sender?.email?.[0]}</AvatarFallback>
                  </Avatar>
                )}

                <Card
                  className={`p-3 rounded-2xl ${isSent ? "bg-orange-500 text-white" : "bg-gray-100"
                    }`}
                >
                  {m?.text && <p>{m.text}</p>}

                  {m?.images?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.images.map((img: string, i: number) => (
                        <ImageViewer
                          images={img}
                          imageUrl={imageUrl}
                          className="mt-2"
                        />
                      ))}

                      {/* <ImageViewer
                        images={['image1.jpg', 'image2.jpg']}
                        imageUrl="/path/to/images/"
                        className="mt-2"
                      /> */}
                    </div>
                  )}
                </Card>

                <p
                  className={`text-xs mt-1 text-gray-500 ${isSent ? "text-right" : "text-left"
                    }`}
                >
                  {formatChatTime(m?.createdAt)}
                </p>
              </div>
            </div>
          )
        })}
      </ScrollArea>
      {/* Footer */}
      <ChatBoxFooter />
    </div>
  )
}

export default ChatABox




