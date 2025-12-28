"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { io, Socket } from "socket.io-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { imageUrl } from "@/constants";
import { myFetch } from "@/utils/myFetch";

// --------- Socket Configuration ----------
const SOCKET_URL = "http://10.10.7.48:5000";

// --------- Time Count ----------
const timeAgo = (dateString: string): string => {
  if (!dateString) return "";

  const now = Date.now();
  const past = new Date(dateString).getTime();
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
};

interface PMessageSidebarProps {
  userId?: string; // Pass the current user ID as a prop
}

const PMessageSidebar = ({ userId }: PMessageSidebarProps) => {
  const [chatList, setChatList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Fetch initial chat list
  const fetchChats = useCallback(async () => {
    try {
      const res = await myFetch("/chats", { tags: ["chats"], cache: "no-cache" });
      console.log("PMessageSidebar", res);
      setChatList(res?.data?.data?.chats || []);
    } catch (error) {
      console.error("Failed to fetch chats", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle new chat event
  const handleNewChat = useCallback((data: any) => {
    console.log("New chat received:", data);
    
    setChatList((prevChats) => {
      // Check if chat already exists
      const existingChatIndex = prevChats.findIndex(
        (chat) => chat._id === data._id
      );

      if (existingChatIndex !== -1) {
        // Update existing chat
        const updatedChats = [...prevChats];
        updatedChats[existingChatIndex] = {
          ...updatedChats[existingChatIndex],
          ...data,
          lastMessageAt: data.lastMessageAt || new Date().toISOString(),
        };
        // Move to top
        const [updatedChat] = updatedChats.splice(existingChatIndex, 1);
        return [updatedChat, ...updatedChats];
      } else {
        // Add new chat to the top
        return [data, ...prevChats];
      }
    });
  }, []);

  // Socket.io setup
  useEffect(() => {
    if (!userId) {
      console.warn("No userId provided for socket connection");
      return;
    }

    // Initialize socket connection
    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    setSocket(socketInstance);

    // Connection events
    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      // Join user's room or authenticate
      socketInstance.emit("join", { userId });
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    // Listen for new chat events
    socketInstance.on(`newChat::${userId}`, handleNewChat);

    // Cleanup on unmount
    return () => {
      console.log("Cleaning up socket connection");
      socketInstance.off(`newChat::${userId}`, handleNewChat);
      socketInstance.disconnect();
    };
  }, [userId, handleNewChat]);

  // Fetch chats on mount
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <div className="w-full flex flex-col lg:h-[calc(100vh-80px)] border-r bg-white rounded-2xl">
      {/* Search */}
      <div className="relative p-2 flex items-center my-5">
        <Input
          placeholder="Search campaigns or artists..."
          className="pl-3 pr-14 bg-white h-12"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary h-12 w-12 rounded-r-md">
          <Search className="text-white w-5 h-5 mx-auto" />
        </button>
      </div>

      {/* Connection Status (optional, for debugging) */}
      {socket && (
        <div className="px-5 py-1">
          <small
            className={`text-xs ${
              socket.connected ? "text-green-600" : "text-red-600"
            }`}
          >
            {socket.connected ? "● Connected" : "● Disconnected"}
          </small>
        </div>
      )}

      <ScrollArea className="flex-1">
        {loading && (
          <p className="text-center text-sm text-gray-500 py-5">
            Loading chats...
          </p>
        )}

        {!loading && chatList.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-5">
            No chats yet
          </p>
        )}

        {!loading &&
          chatList.map((item: any) => {
            const user = item?.participants?.[0];

            return (
              <Link
                key={item?._id}
                href={`/promotor/messages/chat/${item?._id}`}
              >
                <div className="hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start justify-between gap-4 px-5 py-2">
                    {/* Left */}
                    <div className="flex items-center gap-2">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={
                            user?.image
                              ? imageUrl + user.image
                              : "/avatar-placeholder.png"
                          }
                        />
                        <AvatarFallback>
                          {user?.email
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-semibold capitalize">
                          {user?.name ?? user?.userName}
                        </p>
                        <p className="text-sm text-gray-600 pr-3 truncate max-w-[180px]">
                          {item?.lastMessage?.text ?? "No message yet"}
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-end">
                      <small className="text-gray-500 whitespace-nowrap mb-2">
                        {timeAgo(item?.lastMessageAt)}
                      </small>

                      {!!item?.unreadCount && (
                        <Badge className="bg-primary text-white rounded-full">
                          {item.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Separator />
                </div>
              </Link>
            );
          })}
      </ScrollArea>
    </div>
  );
};

export default PMessageSidebar;