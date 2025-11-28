"use client";

import React from "react";
import { StatusBadge } from "./StatusBadge";

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
    disabled: true,
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
      className="rounded-2xl shadow-md flex gap-6"
      style={{
        width: "100%",
        height: "421px",
        padding: "18px 20px",
        backgroundColor: "#FFF8F3",
      }}
    >
      {/* ---------------- LEFT ---------------- */}
      <div className="flex-1 flex flex-col">
        {/* Live + icons */}
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

        {/* Profile */}
        <div className="flex items-center gap-3 mt-4">
          <img
            src={              
              "https://images.pexels.com/photos/3756767/pexels-photo-3756767.jpeg"
            }
            className="w-12 h-12 rounded-full object-cover"
            alt="profile"
          />
          <div>
            <h3 className="font-semibold text-lg">{displayName}</h3>
            <p className="text-gray-600 text-sm">@{username}</p>
          </div>
        </div>

        <hr className="my-3 border-gray-300" />

        {/* Details */}
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

        {/* Progress */}
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

        {/* Button ✅ */}
        <button
          onClick={() => alert("Clicked")}
          disabled={buttonConfig.disabled}
          className={`${buttonConfig.className} 
            text-white w-[150px] py-3 rounded-full mt-4 
            text-[17px] font-medium 
            disabled:cursor-not-allowed`}
        >
          {buttonConfig.label}
        </button>
      </div>

      {/* ---------------- RIGHT ---------------- */}
      <div className="relative">
        <img
          src={
            "https://images.pexels.com/photos/3756767/pexels-photo-3756767.jpeg"
          }
          style={{
            width: "329px",
            height: "100%",
            objectFit: "cover",
            borderRadius: "18px",
          }}
          alt="campaign"
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
