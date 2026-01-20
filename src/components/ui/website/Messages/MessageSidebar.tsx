'use client'
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Music, Search, MessageCircle, Loader2 } from 'lucide-react';
import { CampaignTabGroup } from '../Influencer/InfluencerCampaign/CampaignTabGroup';
import { imageUrl } from '@/constants';
import { myFetch } from '@/utils/myFetch';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useProfile } from '@/hooks/context/ProfileContext';
import useSocket from '@/hooks/useSocket';
import { formatChatTime } from '@/components/shared/FormatChatTime ';

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full py-12 px-6">
        <div className="relative">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary/10 rounded-full animate-pulse" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
        <p className="text-sm text-gray-500 text-center max-w-xs">
            Start a conversation with brands and influencers to see your messages here
        </p>
    </div>
);

const LoadingSkeleton = () => (
    <div className="space-y-4 px-5 py-2">
        {[1, 2, 3, 4, 5].map((item) => (
            <div key={item}>
                <div className="flex items-start justify-between gap-4 animate-pulse">
                    <div className="flex items-center gap-2 flex-1">
                        <div className="w-12 h-12 bg-gray-200 rounded-full" />
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                            <div className="h-3 bg-gray-200 rounded w-48" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="h-3 bg-gray-200 rounded w-16" />
                        <div className="h-5 w-5 bg-gray-200 rounded-full self-end" />
                    </div>
                </div>
                <Separator className="mt-4" />
            </div>
        ))}
    </div>
);


const MessageSidebar = () => {
    const [chats, setChats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { profile } = useProfile();
    const socket = useSocket();

    // Get searchTerm from URL params
    const searchTerm = searchParams.get('searchTerm') || '';

    // Fetch chats with pagination
    const getChats = useCallback(async (pageNum: number = 1, append: boolean = false) => {
        try {
            if (append) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }

            const response = await myFetch(`/chats?page=${pageNum}`, {
                tags: ["chats"],
                cache: "no-cache"
            });
            if (response?.success) {
                const newChats = response?.data?.chats || [];

                if (append) {
                    setChats(prev => [...prev, ...newChats]);
                } else {
                    setChats(newChats);
                }

                // Update hasMore based on response
                const totalPages = response?.meta?.totalPage || 1;
                setHasMore(pageNum < totalPages);
            }
        } catch (error) {
            console.log("get chat error", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        setPage(1);
        getChats(1, false);
    }, [getChats]);

    // Socket listeners
    useEffect(() => {
        if (!socket || !profile?._id) return;

        const handleChatUpdate = async () => {
            setPage(1);
            await getChats(1, false);
        };

        const newChatEvent = `newChat::${profile._id}`;
        const chatListUpdateEvent = `chatListUpdate::${profile._id}`;

        socket.on(newChatEvent, handleChatUpdate);
        socket.on(chatListUpdateEvent, handleChatUpdate);

        return () => {
            socket.off(newChatEvent, handleChatUpdate);
            socket.off(chatListUpdateEvent, handleChatUpdate);
        };
    }, [socket, profile?._id, getChats]);

    // Load more function
    const loadMore = useCallback(() => {
        if (loadingMore || !hasMore) return;

        const nextPage = page + 1;
        setPage(nextPage);
        getChats(nextPage, true);
    }, [page, loadingMore, hasMore, getChats]);

    // Scroll handler
    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const scrollTop = target.scrollTop;
        const scrollHeight = target.scrollHeight;
        const clientHeight = target.clientHeight;

        // Trigger when 100px from bottom
        const threshold = 100;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold;

        if (isNearBottom && hasMore && !loadingMore) {
            loadMore();
        }
    }, [hasMore, loadingMore, loadMore]);

    // Filter chats based on searchTerm
    const filteredChats = useMemo(() => {
        if (!searchTerm) return chats;

        return chats.filter((item: any) => {
            const participantName = item.participants[0]?.name?.toLowerCase() || '';
            const participantEmail = item.participants[0]?.email?.toLowerCase() || '';
            const lastMessageText = item?.lastMessage?.text?.toLowerCase() || '';
            const search = searchTerm.toLowerCase();

            return (
                participantName.includes(search) ||
                participantEmail.includes(search) ||
                lastMessageText.includes(search)
            );
        });
    }, [chats, searchTerm]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set("searchTerm", value);
        } else {
            params.delete("searchTerm");
        }
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleReadMessage = async (id: string) => {
        try {
            await myFetch(`/chats/mark-chat-as-read/${id}`, { method: "PATCH" });
            getChats(1, false);
        } catch (error) {
            console.log("handleReadMessage", error);
        }
    }

    return (
        <div className="w-full min-h-[70vh] max-h-[70vh]  border-r bg-white flex flex-col rounded-2xl no-scrollbar!">
            {/* Search Bar */}
            <div className="relative p-2 flex items-center my-5">
                <Input
                    onChange={handleOnChange}
                    placeholder="Search conversations..."
                    className="pl-3 pr-14 bg-white h-12"
                />
                <button className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-secondary h-12 w-12 rounded-r-md'>
                    <Search className="text-white w-5 h-5 mx-auto" />
                </button>
            </div>

            {/* Conversation List */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto rounded-b-2xl"
            >
                {loading ? (
                    <LoadingSkeleton />
                ) : filteredChats.length === 0 ? (
                    searchTerm ? (
                        <div className="flex flex-col items-center justify-center h-full py-12 px-6">
                            <Search className="w-12 h-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                            <p className="text-sm text-gray-500 text-center max-w-xs">
                                Try searching with a different term
                            </p>
                        </div>
                    ) : (
                        <EmptyState />
                    )
                ) : (
                    <>
                        {filteredChats.map((item: any, idx: number) => (
                            <Link
                                key={idx}
                                onClick={() => handleReadMessage(item?._id)}
                                href={`/${profile?.role === "CREATOR" ? "creator" : "promotor"}/messages/chat/${item?._id}`}
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-4 px-5 py-2 hover:bg-gray-50 cursor-pointer transition-colors">
                                        <div className="flex items-center gap-2">
                                            <Avatar className='w-12 h-12'>
                                                <AvatarImage
                                                    src={`${imageUrl + item.participants[0]?.image}`}
                                                    alt="@evilrabbit"
                                                />
                                                <AvatarFallback>
                                                    {item.participants[0]?.email.split(" ").map((n: any) => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="">
                                                <p className="font-semibold capitalize">{item.participants[0]?.name}</p>
                                                <p className="text-sm text-gray-600 text-clip pr-3">{item?.lastMessage?.text ?? 'text'}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col h-full">
                                            <small className="text-gray-500 whitespace-nowrap mb-2 self-end">
                                                {formatChatTime(item?.lastMessageAt)}
                                            </small>
                                            {item?.unreadCount > 0 && (
                                                <span className='self-end'>
                                                    <Badge className="bg-primary text-white rounded-full">
                                                        {item.unreadCount}
                                                    </Badge>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <Separator />
                                </div>
                            </Link>
                        ))}

                        {/* Loading indicator for pagination */}
                        {loadingMore && (
                            <div className="flex justify-center p-4">
                                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default MessageSidebar