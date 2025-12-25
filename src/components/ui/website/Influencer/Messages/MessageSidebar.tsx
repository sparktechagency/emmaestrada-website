import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Music, Search } from 'lucide-react';
import { CampaignTabGroup } from '../InfluencerCampaign/CampaignTabGroup';
import { imageUrl } from '@/constants';
import { myFetch } from '@/utils/myFetch';


// --------- Time Count ----------
const timeAgo = (dateString: string): string => {

    console.log("dateString", dateString);

    const now = new Date().getTime();
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


// const MessageSidebar = ({ chatData }: any) => {
const MessageSidebar = async () => {

    const chatList = await myFetch("/chats", { tags: ["chats"] });
    console.log("data dddd", chatList?.data?.data?.chats);

    const data = chatList?.data?.data?.chats
    // const {data, totalIconUnreadMessages, totalUnreadMessages, unreadChatsCount} = chatData?.data;


    return (
        <div className="w-full lg:w-[30%] border-r bg-white flex flex-col rounded-2xl ">

            {/* Tabs */}
            <div className=" relative p-2 flex items-center my-5">
                <Input
                    placeholder="Search campaigns or artists..."
                    className="pl-3 pr-14 bg-white h-12 fo"
                />
                <button className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-secondary h-12 w-12  rounded-r-md'><Search className="  text-white w-5 h-5 mx-auto" /></button>
            </div>


            {/* Conversation List */}
            <ScrollArea className="flex-1">

                {/* Item */}
                {chatList?.data?.data?.chats.map((item: any, idx: number) => (
                    <div key={idx}>
                        <div className="flex items-start justify-between gap-4 px-5 py-2 hover:bg-gray-50 cursor-pointer">
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
                                    <p className="font-semibold">{item.participants[0]?.email}</p>
                                    <p className="text-sm text-gray-600 text-clip pr-3">{item?.lastMessage?.text ?? 'text'}</p>

                                </div>
                            </div>

                            <div className=" flex flex-col h-full">
                                <small className="text-gray-500 whitespace-nowrap mb-2 self-end">{timeAgo(item?.lastMessageAt)}</small>
                                <span className='self-end'>
                                    <Badge className="bg-primary text-white rounded-full">{item.unreadCount}</Badge>
                                </span>
                            </div>
                        </div>
                        <Separator />
                    </div>
                ))}

            </ScrollArea>
        </div>
    )
}

export default MessageSidebar