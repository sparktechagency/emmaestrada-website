'use client'

import { useState } from "react"
import Image from "next/image"
import { Send, EllipsisVertical, ImageIcon, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import { imageUrl } from "@/constants"
import { useProfile } from "@/hooks/context/ProfileContext"
import { myFetch } from "@/utils/myFetch"
import { revalidate } from "@/helpers/revalidateHelper"
import { formatChatTime } from "@/components/shared/FormatChatTime "


const ChatABox = ({ messages }: any) => {
  const { profile } = useProfile()

  const [message, setMessage] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim() && !imageFile) return

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("text", message)

      if (imageFile) {
        formData.append("image", imageFile)
      }

      const res = await myFetch("/messages/send-message/694d28de2c790c489e878187", {
        method: "POST",
        body: formData,
      })

      if (res?.success) {
        setMessage("")
        setImageFile(null)
        revalidate("chats")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 bg-white flex flex-col rounded-2xl">

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
      <ScrollArea className="flex-1 px-6 py-4">
        {messages?.map((m: any) => {
          const isSent = m?.sender?._id === profile?._id

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
                  className={`p-3 rounded-2xl ${isSent
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100"
                    }`}
                >
                  {m?.text && <p>{m.text}</p>}

                  {m?.image && (
                    <img
                      src={`${imageUrl}${m.image}`}
                      className="mt-2 h-32 w-32 rounded-lg object-cover"
                      alt="message"
                    />
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

      {/* Image Preview */}
      {/* Attached Image Preview */}
      {imageFile && (
        <div className="px-4 pb-3">
          <div className="relative inline-block rounded-xl border bg-gray-50 p-2 shadow-sm">

            {/* Remove Button */}
            <button
              onClick={() => setImageFile(null)}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
            >
              <X size={14} />
            </button>

            {/* Image */}
            <img
              src={URL.createObjectURL(imageFile)}
              alt="attached"
              className="h-24 w-24 rounded-lg object-cover"
            />

            {/* Label */}
            <p className="mt-1 text-center text-[11px] text-gray-500">
              Image attached
            </p>
          </div>
        </div>
      )}


      {/* Footer */}
      <div className="p-4 border-t flex items-center gap-3">

        {/* Image Upload */}
        <label className="cursor-pointer">
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) =>
              e.target.files && setImageFile(e.target.files[0])
            }
          />
          <ImageIcon className="text-gray-500 hover:text-gray-700" />
        </label>

        {/* Message Input */}
        <Input
          className="flex-1"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        {/* Send Button */}
        <Button
          disabled={loading || (!message.trim() && !imageFile)}
          onClick={sendMessage}
          className="rounded-full p-3 bg-orange-500 hover:bg-orange-600"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  )
}

export default ChatABox
