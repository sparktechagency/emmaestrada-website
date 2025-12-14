"use client";

import React from "react";
import { StatusBadge } from "./StatusBadge";
import Image from "next/image";
import { Gift } from "lucide-react";

type CampaignStatus =
  | "upcoming"
  | "pending"
  | "accepted"
  | "canceled"
  | "active"
  | "pactive"
  | "pcompleted"

interface CampaignCardProps {
  name?: string;
  budget?: string;
  influencers?: string;
  dateRange?: string;
  duration?: string;
  progress?: number;
  profileImg?: string;
  rightImg?: string;
  username?: string;
  displayName?: string;
  isPrivate?: boolean;
  status?: CampaignStatus;
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
  pactive: {
    label: "Manage Campaigns",
    className: "bg-transparent! border! border-secondary! text-black! text-xs! ",
    disabled: false,
  },
  pcompleted: {
    label: "Delete",
    className: "bg-transparent! border! border-secondary! text-red-600! text-xs! ",
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

const CampaignCard: React.FC<CampaignCardProps> = ({
  name,
  budget,
  influencers,
  dateRange,
  duration,
  progress = 0,
  profileImg,
  rightImg,
  username,
  displayName,
  isPrivate,
  status = "active",
}) => {
  const buttonConfig =
    statusButtonConfig[status] ?? statusButtonConfig.active;

  return (
    <div
      className="rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2  gap-4 lg:h-[421px] p-5 bg-[#FFF8F3]"
      // style={{
      //   width: "100%",
      //   height: "421px",
      //   padding: "18px 20px",
      //   backgroundColor: "#FFF8F3",
      // }}
    >
      
      <div className="flex-1 flex flex-col order-2 md:order-1">
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              <span className="w-2 h-2 bg-white rounded-full" />
              Live
            </span>

            {isPrivate && (
              <img src="/lockSign.png" width={20} height={20} alt="lock" />
            )}
          </div>

          <div className="flex gap-2">
            <img src="/tiktokBlack.png" width={20} alt="" />
            <img src="/instagram.png" width={20} alt="" />
            <img src="/youtube.png" width={20} alt="" />
          </div>
        </div>

        
        <div className="flex items-center gap-3 mt-4">
          <Image
            src={
              "https://images.pexels.com/photos/3756767/pexels-photo-3756767.jpeg"
            }
            alt="profile"
            height={100}
            width={100}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg blur-[10px]">{displayName}</h3>
            <p className="text-gray-600 text-sm">@{username}</p>
          </div>
        </div>

        <hr className="my-3 border-gray-300" />

        
        <div className="space-y-1 text-[16px]">
          <p>
            <span className="font-semibold">Title:</span>{" "}
            <span className="text-orange-500 font-medium">{name}</span>
          </p>

          <p>
            <span className="font-semibold">Types:</span>{" "}
            <span className="text-orange-500 font-medium">Pop</span>
          </p>

          <p>
            <span className="font-semibold">Budget:</span>{" "}
            <span className="text-orange-500 font-medium">{budget}</span>
          </p>

          <p>
            <span className="font-semibold">Content Type:</span>{" "}
            <span className="text-orange-500 font-medium">
              UCG
            </span>
          </p>          
          <p className="flex items-center gap-3">
            <span className="font-semibold flex items-center gap-2"> <Gift strokeWidth={1} size={16} color="var(--color-primary)"/> Rewards-:</span>{" "}
            <span className="text-orange-500 font-medium">
              $0.25/1K
            </span>
          </p>          
        </div>
        
        <div className="mt-7">
          <p className="text-right text-xs mb-2 text-gray-600 flex items-center justify-between">
            <span className="font-semibold">$700.60 of $8000.00 paid out</span>
            <span>{progress}%</span> 
          </p>
          <div className="h-2 rounded-full bg-gray-300">
            <div
              className="h-2 bg-orange-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>          
        </div>
      
        <button          
          // disabled={buttonConfig.disabled}
          className={`${buttonConfig.className} 
            text-white w-full md:w-[150px] py-3 rounded-full mt-4 
            text-[17px] font-medium 
            disabled:cursor-not-allowed`}
        >
          {buttonConfig.label}
        </button>
      </div>

      
      <div className="relative order-1 md:order-2">
        <Image
          src={
            "/images/campaign-img.png"
          }
          // style={{
          //   width: "329px",
          //   height: "100%",
          //   objectFit: "cover",
          //   borderRadius: "18px",
          // }}
          alt="campaign"
          height={500}
          width={500}
          className="h-[300px] md:h-full w-full object-cover rounded-[12px]"
          draggable={false}
        />

        {["pending", "accepted", "canceled", "pcompleted"].includes(status) && (
          <div className="absolute top-3 right-2">
            <StatusBadge status={status as "pending" | "accepted" | "canceled" | "pcompleted"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignCard;


// -- horiZONTALL SHAPE --
/*
<div
      className="rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2  gap-4 lg:h-[421px] p-5 bg-[#FFF8F3]"
      // style={{
      //   width: "100%",
      //   height: "421px",
      //   padding: "18px 20px",
      //   backgroundColor: "#FFF8F3",
      // }}
    >
      
      <div className="flex-1 flex flex-col order-2 md:order-1">
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              <span className="w-2 h-2 bg-white rounded-full" />
              Live
            </span>

            {isPrivate && (
              <img src="/lockSign.png" width={20} height={20} alt="lock" />
            )}
          </div>

          <div className="flex gap-2">
            <img src="/tiktokBlack.png" width={20} alt="" />
            <img src="/instagram.png" width={20} alt="" />
            <img src="/youtube.png" width={20} alt="" />
          </div>
        </div>

        
        <div className="flex items-center gap-3 mt-4">
          <Image
            src={
              "https://images.pexels.com/photos/3756767/pexels-photo-3756767.jpeg"
            }
            alt="profile"
            height={100}
            width={100}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{displayName}</h3>
            <p className="text-gray-600 text-sm">@{username}</p>
          </div>
        </div>

        <hr className="my-3 border-gray-300" />

        
        <div className="space-y-1 text-[16px]">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            <span className="text-orange-500 font-medium">{name}</span>
          </p>

          <p>
            <span className="font-semibold">Budget:</span>{" "}
            <span className="text-orange-500 font-medium">{budget}</span>
          </p>

          <p>
            <span className="font-semibold">Influencers:</span>{" "}
            <span className="text-orange-500 font-medium">
              {influencers}
            </span>
          </p>

          <p className="flex items-center gap-2">📅 {dateRange}</p>
          <p className="flex items-center gap-2">⏱️ {duration}</p>
        </div>
        
        <div className="mt-3">
          <div className="h-2 rounded-full bg-gray-300">
            <div
              className="h-2 bg-orange-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-right text-sm mt-1 text-gray-600">
            {progress}%
          </p>
        </div>
      
        <button          
          disabled={buttonConfig.disabled}
          className={`${buttonConfig.className} 
            text-white w-full md:w-[150px] py-3 rounded-full mt-4 
            text-[17px] font-medium 
            disabled:cursor-not-allowed`}
        >
          {buttonConfig.label}
        </button>
      </div>

      
      <div className="relative order-1 md:order-2">
        <Image
          src={
            "/images/campaign-img.png"
          }
          // style={{
          //   width: "329px",
          //   height: "100%",
          //   objectFit: "cover",
          //   borderRadius: "18px",
          // }}
          alt="campaign"
          height={500}
          width={500}
          className="h-[300px] md:h-full w-full object-cover rounded-[12px]"
          draggable={false}
        />

        {["pending", "accepted", "canceled", "pcompleted"].includes(status) && (
          <div className="absolute top-3 right-2">
            <StatusBadge status={status as "pending" | "accepted" | "canceled" | "pcompleted"} />
          </div>
        )}
      </div>
    </div>

    */

    /*

        <div
      className="rounded-2xl shadow-md  gap-4  p-5 bg-[#FFF8F3]"
      // style={{
      //   width: "100%",
      //   height: "421px",
      //   padding: "18px 20px",
      //   backgroundColor: "#FFF8F3",
      // }}
    >
      <div >
        <Image
          src={
            "/images/campaign-img.png"
          }
          // style={{
          //   width: "329px",
          //   height: "100%",
          //   objectFit: "cover",
          //   borderRadius: "18px",
          // }}
          alt="campaign"
          height={500}
          width={500}
          className="h-[300px] w-full object-cover rounded-[12px]"
          draggable={false}
        />

        {["pending", "accepted", "canceled", "pcompleted"].includes(status) && (
          <div className="absolute top-3 right-2">
            <StatusBadge status={status as "pending" | "accepted" | "canceled" | "pcompleted"} />
          </div>
        )}
      </div>      
      <div className=" flex flex-col ">        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              <span className="w-2 h-2 bg-white rounded-full" />
              Live
            </span>

            {isPrivate && (
              <img src="/lockSign.png" width={20} height={20} alt="lock" />
            )}
          </div>

          <div className="flex gap-2">
            <img src="/tiktokBlack.png" width={20} alt="" />
            <img src="/instagram.png" width={20} alt="" />
            <img src="/youtube.png" width={20} alt="" />
          </div>
        </div>

        
        <div className="flex items-center gap-3 mt-4">
          <Image
            src={
              "https://images.pexels.com/photos/3756767/pexels-photo-3756767.jpeg"
            }
            alt="profile"
            height={100}
            width={100}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{displayName}</h3>
            <p className="text-gray-600 text-sm">@{username}</p>
          </div>
        </div>

        <hr className="my-3 border-gray-300" />

        
        <div className="space-y-1 text-[16px]">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            <span className="text-orange-500 font-medium">{name}</span>
          </p>

          <p>
            <span className="font-semibold">Budget:</span>{" "}
            <span className="text-orange-500 font-medium">{budget}</span>
          </p>

          <p>
            <span className="font-semibold">Influencers:</span>{" "}
            <span className="text-orange-500 font-medium">
              {influencers}
            </span>
          </p>

          <p className="flex items-center gap-2">📅 {dateRange}</p>
          <p className="flex items-center gap-2">⏱️ {duration}</p>
        </div>
        
        <div className="mt-3">
          <div className="h-2 rounded-full bg-gray-300">
            <div
              className="h-2 bg-orange-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-right text-sm mt-1 text-gray-600">
            {progress}%
          </p>
        </div>
        
        <button          
          disabled={buttonConfig.disabled}
          className={`${buttonConfig.className} 
            text-white w-full md:w-[150px] py-3 rounded-full
            text-[17px] font-medium 
            disabled:cursor-not-allowed`}
        >
          {buttonConfig.label} 
        </button>
      </div>

    </div>

    */