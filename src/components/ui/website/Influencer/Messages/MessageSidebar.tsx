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


const MessageSidebar = () => {
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
                {[
                    { name: "Olivia Richards", time: "2 min ago", campaign: "Summer Vibes 2024", msg: "Just posted the first video! Check it out 🎵", badge: 2, isPined: false },
                    { name: "Marcus Thompson", time: "1 hour ago", campaign: "Rock Revolution", msg: "When is the deadline for submissions?", badge: 0, isPined: true },
                    { name: "Sofia Martinez", time: "3 hours ago", campaign: "Summer Vibes 2024", msg: "Thanks for the feedback! submissions", badge: 0, isPined: false },
                    { name: "Luna Rivers", time: "5 hours ago", campaign: "Collaboration Request", msg: "Would love to work together", badge: 1, isPined: false },
                    { name: "Alex Kim", time: "1 day ago", campaign: "R&B Smooth Sessions", msg: "The video reached 500K views already! 🔥", badge: 0, isPined: false }
                ].map((item, idx) => (
                    <div key={idx}>
                        <div className="flex items-start gap-4 px-5 pb-4 hover:bg-gray-50 cursor-pointer">
                            <Avatar className='w-12 h-12'>
                                <AvatarImage
                                    src="/images/profile21.jpg"
                                    alt="@evilrabbit"
                                />
                                <AvatarFallback>
                                    {item.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>

                            <div className="">    
                                <div className="flex items-center justify-between">
                                <p className="font-semibold">{item.name}</p>
                                <small className="text-gray-500 whitespace-nowrap self-end">{item.time}</small>
                                </div>                            
                                    
                                <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600 text-clip pr-3">{item.msg}</p>
                                <span className='self-end'>
                                    <Badge className="bg-primary text-white rounded-full">{item.badge}</Badge>                                
                                </span>
                                
                                </div>
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