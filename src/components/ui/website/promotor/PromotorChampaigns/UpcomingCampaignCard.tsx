"use client";

import React from "react";
import Image from "next/image";
import { Gift } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { myFetch } from "@/utils/myFetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { imageUrl } from "@/constants";



const platformIcons: Record<string, string> = {
    TikTok: "/tiktokBlack.png",
    Instagram: "/instagram.png",
    YouTube: "/youtube.png",
};


const UpcomingCampaignCard = ({ campaign }: { campaign?: any }) => {

    console.log("campaign,campaign,", campaign);
    
    const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
    
    console.log("campaign,role,", role);
    const router = useRouter();

    const handleAddBudget = async () => {
        try {
            const response = await myFetch(`/orders/create-and-checkout`, {
                method: 'POST',
                body: { campaignId: campaign?._id },
            });
            if (response?.success) {

                if (response?.success && response?.data?.url) {
                    router.push(response.data.url);
                }
            } else if (response?.message) {
                toast.error(response?.message);
            }
        } catch (error: any) {
            toast.error(error?.message);
            console.log("error", error);
        }
    }

    return (
        <div className="rounded-2xl relative shadow-md grid grid-cols-1 gap-4 bg-[#FFF8F3]">
            {/* IMAGE */}
            <div className="relative p-1">
                <Image
                    src={
                        campaign?.thumbnail
                            ? `${imageUrl}${campaign.thumbnail}`
                            : "/images/campaign-img.png"
                    }
                    alt="campaign"
                    height={500}
                    width={500}
                    className="max-h-[200px] h-full w-full object-cover rounded-t-[12px]"
                    draggable={false}                    
                />
            </div>
            {/* CONTENT */}
            <div className="flex-1 flex flex-col px-3 pb-3">
                {/* USER INFO */}
                <div className="flex justify-between gap-3 mt-3">
                    <div className="flex items-center gap-3">
                        <Image
                            src={`${campaign?.userId?.image &&
                                campaign?.userId?.image.startsWith('http') ? `${campaign?.userId?.image}`
                                : campaign?.userId?.image ? `${imageUrl}${campaign?.userId?.image}` : "/placeholder.png"}`}
                            alt="profile"
                            height={200}
                            width={200}
                            className="w-12 h-12 rounded-full object-cover"                            
                        />
                        <div>
                            <h3 className={`font-semibold text-lg ${!role && "blur-[10px]"}`}>
                                {campaign?.userId?.name || "Unknown User"}
                            </h3>
                            <p className="text-gray-600 text-sm lowercase">
                                @{campaign?.userId?.userName || "unknown"} 
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="my-3 border-gray-300" />

                {/* DETAILS */}
                <div className="space-y-1 text-[14px]">
                    <p>
                        <span className="font-normal text-lg">Title:</span>{" "}
                        <span className="text-orange-500 text-lg">
                            New Marketing Campaign
                        </span>
                    </p>

                    <div className="grid grid-cols-2 gap-y-2">
                        <p>
                            <span className="font-normal">Type:</span>{" "}
                            <span className="text-orange-500">Fashion</span>
                        </p>

                        <p>
                            <span className="font-normal">Flat Fee:</span>{" "}
                            <span className="text-orange-500">$0</span>
                        </p>

                        <p>
                            <span className="font-normal">Content Type:</span>{" "}
                            <span className="text-orange-500">Video</span>
                        </p>

                        <p className="flex items-center gap-2">
                            <Gift strokeWidth={1} size={16} />
                            <span className="text-orange-500">$0 / 1K</span>
                        </p>

                        <p>
                            <span className="font-normal">Min Payout:</span>{" "}
                            <span className="text-orange-500">$0.00</span>
                        </p>

                        <p>
                            <span className="font-normal">Max Payout:</span>{" "}
                            <span className="text-orange-500">$0.00</span>
                        </p>
                    </div>
                </div>

                {/* BUDGET */}
                <div className="grid grid-cols-2 gap-y-2 mt-3 text-sm">
                    <p>
                        <span className="font-normal">Budget:</span>{" "}
                        <span className="text-orange-500">$0</span>
                    </p>
                    <p className="font-semibold text-gray-600">$0 of $0</p>
                </div>

                {/* PROGRESS */}
                <div className="relative h-4 rounded-full bg-gray-300 mt-2">
                    <div className="h-4 bg-black/60 rounded-full w-0" />
                    <p className="absolute top-1/2 left-1/2 text-xs -translate-1/2 text-white">
                        paid out 0%
                    </p>
                </div>

                {/* ACTIONS */}
                <div >
                    <Button variant="outline" className="w-full py-5 text-primary! my-4" onClick={() => handleAddBudget()}>
                        Add Budget
                    </Button>

                    <Link href={`promotor/campaigns/${campaign?._id}`}>
                        <Button className="w-full py-5" >
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UpcomingCampaignCard;
