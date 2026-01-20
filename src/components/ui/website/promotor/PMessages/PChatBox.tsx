'use client';

import { EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatChatTime } from "@/components/shared/FormatChatTime ";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { imageUrl } from "@/constants";
import { useProfile } from "@/hooks/context/ProfileContext";
import { myFetch } from "@/utils/myFetch";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import PChatBoxFooter from "./PChatBoxFooter";
import { getSocket } from "@/lib/socketClient";

const PChatBox = ({profile}: {profile: any}) => {
  const params = useParams() as { chatId?: string };

  const [messages, setMessages] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ---------------- FETCH INITIAL MESSAGES ---------------- */
  const fetchMessage = async () => {
    try {
      const { data } = await myFetch(
        `/messages/${params?.chatId}`,
        { cache: "no-cache" }
      );
      setMessages(data?.data?.messages || []);
    } catch (error: any) {
      console.log(error?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (params?.chatId) {
      fetchMessage();
    }
  }, [params?.chatId]);

  /* ---------------- SOCKET LISTENER ---------------- */
  useEffect(() => {
    if (!profile?._id) return;

    const socket = getSocket();
    
    const handleNewMessage = (newMessage: any) => {
      // ✅ only for current chat
      if (newMessage.chatId !== params?.chatId) return;

      // ✅ append instead of refetch
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on(`newMessage::${profile._id}`, handleNewMessage);

    return () => {
      socket.off(`newMessage::${profile._id}`, handleNewMessage);
    };
  }, [profile?._id, params?.chatId]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 bg-white flex-col rounded-2xl flex h-full min-h-[90vh] w-full">
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
      <ScrollArea className="flex-1 h-full px-6 py-4">
        {messages.map((m: any) => {
          const isSent = m?.sender?._id === profile?._id;

          return (
            <div
              key={m?._id}
              className={`flex ${isSent ? "justify-end" : "justify-start"} mb-4`}
            >
              <div className="max-w-[70%]">
                {!isSent && (
                  <Avatar className="w-8 h-8 mb-1">
                    <AvatarImage src={`${imageUrl}${m?.sender?.image}`} />
                    <AvatarFallback>
                      {m?.sender?.email?.[0]}
                    </AvatarFallback>
                  </Avatar>
                )}

                <Card
                  className={`p-3 rounded-2xl ${
                    isSent
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {m?.text && <p>{m.text}</p>}

                  {m?.images?.length > 0 && (
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {m.images.map((img: string, i: number) => (
                        <img
                          key={i}
                          src={`${imageUrl}${img}`}
                          className="h-24 w-24 rounded-lg object-cover"
                          alt="message"
                        />
                      ))}
                    </div>
                  )}
                </Card>

                <p
                  className={`text-xs mt-1 text-gray-500 ${
                    isSent ? "text-right" : "text-left"
                  }`}
                >
                  {formatChatTime(m?.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </ScrollArea>

      {/* Footer */}
      <PChatBoxFooter />
    </div>
  );
};

export default PChatBox;
