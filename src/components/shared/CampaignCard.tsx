"use client";

import React from "react";
import { StatusBadge } from "./StatusBadge";
import Image from "next/image";
import { Gift } from "lucide-react";
import { Button } from "../ui/button";
import { imageUrl } from "@/constants";

import Link from "next/link";
import Cookies from "js-cookie";
type CampaignStatus =
  | "upcoming"
  | "pending"
  | "accepted"
  | "canceled"
  | "inactive"
  | "active"
  | "pcompleted";

interface CampaignCardProps {
  campaign: {
    _id: string;
    title: string;

    budget: {
      rewardRate: number;
      perViews: number;
      minPayout: number;
      maxPayout: number;
      flatPrice: number;
    };
    platforms: string[];
    campaignAmount: number;
    paidAmount: number;
    totalPaidOutAmount: number;
    contentType: string;
    genre?: string;
    category?: string;
    thumbnail?: string;
    profileImg?: string;
    username?: string;
    displayName?: string;
    status: CampaignStatus;
    isJoined?: boolean;
    [key: string]: any;
  };
  label?: string;
  profile?:any
}

/* -------------------- STATUS CONFIG -------------------- */
const statusButtonConfig: Record<
  CampaignStatus,
  {
    label: string;
    className: string;
    disabled: boolean;
  }
> = {
  upcoming: {
    label: "Upcoming",
    className: "bg-black",
    disabled: true,
  },
  inactive: {
    label: "Add Budget",
    className:
      "bg-transparent! border! border-secondary! text-black! text-xs! ",
    disabled: false,
  },
  pcompleted: {
    label: "Delete",
    className:
      "bg-transparent! border! border-secondary! text-red-600! text-xs! ",
    disabled: true,
  },
  pending: {
    label: "Requested",
    className: "bg-primary/40",
    disabled: true,
  },
  accepted: {
    label: "Submit",
    className: "bg-blue-800",
    disabled: false,
  },
  canceled: {
    label: "Canceled",
    className: "bg-gray-300 text-gray-600",
    disabled: true,
  },
  active: {
    label: "Join Now",
    className: "bg-primary",
    disabled: false,
  },
};
/* ------------------------------------------------------- */

const platformIcons: Record<string, string> = {
  TikTok: "/tiktokBlack.png",
  Instagram: "/instagram.png",
  YouTube: "/youtube.png",
};

const CampaignCard = ({ campaign, label, profile }: CampaignCardProps) => {
  const status = campaign?.status;
  const buttonConfig = statusButtonConfig[status];

  const progress = campaign?.campaignAmount
    ? Math.round(
      (campaign?.totalPaidOutAmount / campaign?.campaignAmount) * 100
    )
    : 0;

    
  const token = Cookies.get("accessToken");
  const role = Cookies.get("role");

  return (
    <div className="rounded-2xl relative shadow-md grid grid-cols-1 gap-4 bg-[#FFF8F3]">
      <div className="flex-1 flex flex-col order-2 px-3 pb-3">
        <div className="absolute top-3 left-3 z-20 flex w-[90%] justify-end items-center ">
          {/* <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              <span className="w-2 h-2 bg-white rounded-full" />
              Live
            </span>
          </div> */}
          <div className="flex gap-2 bg-white/50 p-2 rounded-lg">
            {campaign?.platforms?.map((platform) =>
              platformIcons[platform] ? (
                <Image
                  key={platform}
                  src={platformIcons[platform]}
                  height={20}
                  width={20}
                  className="h-5 w-5 object-contain"
                  alt={platform}
                />
              ) : null
            )}
          </div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              src={`${campaign?.userId?.image &&
                campaign?.userId?.image.startsWith('http') ? `${campaign?.userId?.image}`
                : campaign?.userId?.image ? `${imageUrl}${campaign?.userId?.image}` : "/placeholder.png"}`}
              alt="profile"
              unoptimized
              height={200}
              width={200}
              className="w-12 h-12 rounded-full  object-cover"
            />
            <div>
              <h3 className={`font-semibold text-lg ${!token && "blur-[10px]"}`}>
                {campaign?.userId?.name || "Unknown User"}
              </h3>
              <p className="text-gray-600 text-sm lowercase">
                @{campaign?.userId?.userName || "unknown"}
              </p>
            </div>
          </div>
          {["pending", "accepted", "canceled", "pcompleted"].includes(
            campaign?.status
          ) && (
              <div className="">
                <StatusBadge
                  status={
                    campaign?.status as
                    | "pending"
                    | "accepted"
                    | "canceled"
                    | "pcompleted"
                  }
                />
              </div>
            )}
        </div>

        <hr className="my-3 border-gray-300" />

        <div className="space-y-1 text-[14px]">
          <p>
            <span className="font-normal text-lg">Title:</span>{" "}
            <span className="text-orange-500 text-lg">{campaign?.title}</span>
          </p>
          <div className="grid grid-cols-2 gap-y-2">
            <p>
              <span className="font-normal">Types:</span>{" "}
              <span className="text-orange-500 ">
                {campaign?.genre || campaign?.category}
              </span>
            </p>

            <p>
              <span className="font-normal">Flat Fee:</span>{" "}
              <span className="text-orange-500 ">
                ${campaign?.budget?.flatPrice}
              </span>
            </p>

            <p>
              <span className="font-normal">Content Type:</span>{" "}
              <span className="text-orange-500 ">{campaign?.contentType}</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="font-normal flex items-center gap-2">
                {" "}
                <Gift
                  strokeWidth={1}
                  size={16}
                  color="var(--color-primary)"
                />{" "}
                Rewards-:
              </span>{" "}
              <span className="text-orange-500 ">
                ${campaign?.budget?.rewardRate}/
                {campaign?.budget?.perViews
                  ?((Number(campaign?.budget?.perViews) / 1000)).toFixed(0) + "K"
                  : "1K"}
                  
              </span>
            </p>

            <p>
              <span className="font-normal">Min Payout:</span>{" "}
              <span className="text-orange-500 ">
                ${(campaign?.budget?.minPayout).toFixed(2)}
              </span>
            </p>


            <p>
              <span className="font-normal">Max Payout:</span>{" "}
              <span className="text-orange-500 ">
                ${(campaign?.budget?.maxPayout).toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2 mt-3 pb-1 text-sm">
          <p>
            <span className="font-normal">Budget:</span>{" "}
            <span className="text-orange-500 ">
              ${campaign?.campaignAmount}
            </span>
          </p>
          <p className="font-semibold  mb-2 text-gray-600 ">
            ${campaign?.totalPaidOutAmount} of ${campaign?.campaignAmount}
          </p>
        </div>

        <div className="relative h-4 rounded-full bg-gray-300">
          <div
            className="h-4 bg-black/60 rounded-full"
            style={{ width: `${progress}%` }}
          />
          <p
            className="absolute z-20 top-1/2 left-1/2 text-xs -translate-1/2 capitalize mb-2 text-white"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.9)" }}
          >
            paid out {progress}%
          </p>
        </div>

        <Link href={`/${role === "PROMOTER" ? "promotor/campaigns" : "creator"}/${campaign?._id}`}><Button className="mt-3 w-full! py-5!">
          {/* {label ?? buttonConfig?.label} */}
          View Details
        </Button></Link>
      </div>

      {/* <div className="relative order-1 md:order-2"> */}
      <div className="relative order-1 p-1">
        <Image
          src={
            campaign?.thumbnail
              ? imageUrl + campaign.thumbnail
              : "/images/campaign-img.png"
          }
          alt="campaign"
          height={500}
          width={500}
          className="max-h-[200px] h-full w-full object-cover rounded-t-[12px]"
          draggable={false}
          unoptimized
        />
      </div>
    </div>
  );
};

export default CampaignCard;