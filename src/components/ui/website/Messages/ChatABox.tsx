"use client"

import { Loader2, MessageCircle } from "lucide-react"
import { useEffect, useState, useRef } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

import { formatChatTime } from "@/components/shared/FormatChatTime "
import ImageViewer from "@/components/shared/ImageViewer"
import { imageUrl } from "@/constants"
import { useProfile } from "@/hooks/context/ProfileContext"
import useSocket from "@/hooks/useSocket"
import { myFetch } from "@/utils/myFetch"
import ChatBoxFooter from "./ChatBoxFooter"
import ChatBoxHeader from "./ChatBoxHeader"

interface ChatBoxProps {
  chatId: string
}

const ChatBox = ({ chatId }: ChatBoxProps) => {
  const [loading, setLoading] = useState(true)
  const { profile } = useProfile();
  const [messages, setMessage] = useState([]);
  const [participant, setParticipant] = useState(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const socket = useSocket();

  // Function to scroll to bottom
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await myFetch(`/messages/${chatId}`, {
        tags: ["messages", "chats"], cache: "no-cache"
      })
      setMessage(response?.data?.messages?.reverse());
      setParticipant(response?.data?.participants?.[0]);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (chatId) {
      setLoading(true)
      fetchMessages()
    }
  }, [chatId])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  socket.on(`newMessage::${profile?._id}`, async (data) => {
    console.log("newMessage", data);
    await fetchMessages()
  })

  return (
    <div className="flex-1 h-full min-h-[70vh] max-h-[70vh] bg-white flex flex-col rounded-2xl">
      {/* Header */}
      <ChatBoxHeader participantInfo={participant} />

      {/* Loading */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center px-4 py-2">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            <p className="text-gray-600 font-medium">Loading messages...</p>
          </div>
        </div>
      ) : !messages || messages?.length === 0 ? (
        <div className="flex-1 flex items-center justify-center px-4 py-2">
          <div className="flex flex-col items-center gap-4 px-8 text-center">
            <MessageCircle className="w-32 h-32 text-gray-300" strokeWidth={1.5} />
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No messages yet
              </h3>
              <p className="text-gray-500 max-w-sm">
                Start a conversation by sending your first message below
              </p>
            </div>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1 px-4 py-2 overflow-y-auto" ref={scrollRef}>
          <div className="flex flex-col">
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
                      className={`p-3 rounded-2xl ${isSent ? "bg-orange-500 text-white" : "bg-gray-100"
                        }`}
                    >
                      {m?.text && <p>{m.text}</p>}
                      {m?.images?.length > 0 && (
                        <ImageViewer
                          images={m.images}
                          imageUrl={imageUrl}
                          className="mt-2"
                          thumbnailClassName="cursor-pointer"
                          thumbnailHeight="h-32"
                          thumbnailWidth="w-32"
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
          </div>
        </ScrollArea>
      )}

      {/* Footer */}
      <ChatBoxFooter />
    </div>
  )
}

export default ChatBox