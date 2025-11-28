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
import { Music } from 'lucide-react';
import { CampaignTabGroup } from '../InfluencerCampaign/CampaignTabGroup';


const MessageSidebar = () => {
    return (
        <div className="w-full lg:w-[30%] border-r bg-white flex flex-col rounded-2xl">

            {/* Tabs */}

            <div className="max-w-sm text-center py-3">
                <CampaignTabGroup
                    tabs={[
                        { label: 'All', value: 'all' },
                        { label: 'Accepted', value: 'accepted' },
                    ]}
                    queryParam="status"
                />
            </div>


            {/* Conversation List */}
            <ScrollArea className="flex-1">

                {/* Item */}
                {[
                    { name: "Olivia Richards", time: "2 min ago", campaign: "Summer Vibes 2024", msg: "Just posted the first video! Check it out 🎵", badge: 2 },
                    { name: "Marcus Thompson", time: "1 hour ago", campaign: "Rock Revolution", msg: "When is the deadline for submissions?", badge: 0 },
                    { name: "Sofia Martinez", time: "3 hours ago", campaign: "Summer Vibes 2024", msg: "Thanks for the feedback!", badge: 0 },
                    { name: "Luna Rivers", time: "5 hours ago", campaign: "Collaboration Request", msg: "Would love to work together", badge: 1 },
                    { name: "Alex Kim", time: "1 day ago", campaign: "R&B Smooth Sessions", msg: "The video reached 500K views already! 🔥", badge: 0 }
                ].map((item, idx) => (
                    <div key={idx}>
                        <div className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 cursor-pointer">
                            <Avatar className='w-14 h-14'>
                                <AvatarImage                                
                                    src="/images/profile21.jpg"
                                    alt="@evilrabbit"
                                />
                                <AvatarFallback>
                                    {item.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{item.name}</p>
                                    <small className="text-gray-500">{item.time}</small>
                                </div>

                                <p className="text-orange-500 text-xs flex items-center mt-1">
                                    <Music size={14} className="mr-1" /> {item.campaign}
                                </p>

                                <p className="text-sm text-gray-600">{item.msg}</p>
                            </div>

                            {item.badge > 0 && (
                                <Badge className="bg-orange-500 text-white rounded-full">{item.badge}</Badge>
                            )}
                        </div>
                        <Separator />
                    </div>
                ))}

            </ScrollArea>
        </div>
    )
}

export default MessageSidebar