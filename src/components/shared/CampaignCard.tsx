"use client";

import React from "react";

interface CampaignCardProps {
  name: string;
  budget: string;
  influencers: string;
  dateRange: string;
  duration: string;
  progress: number;
  profileImg: string;
  rightImg: string;
  username: string;
  displayName: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  name,
  budget,
  influencers,
  dateRange,
  duration,
  progress,
  profileImg,
  rightImg,
  username,
  displayName,
}) => {
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
      {/* Left Section */}
      <div className="flex-1 flex flex-col">
        {/* Live + Icons */}
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
            <span className="w-2 h-2 bg-white rounded-full"></span> Live
          </span>

          <div className="flex gap-2 text-[20px]">
            <span>🎵</span>
            <span>📸</span>
            <span>▶️</span>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 mt-4">
          <img
            src="https://triple-slider.uiinitiative.com/images/thor-ragnarok.jpg"
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
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
            <span className="text-orange-500 font-medium">{influencers}</span>
          </p>

          <p className="flex items-center gap-2">
            📅 <span>{dateRange}</span>
          </p>

          <p className="flex items-center gap-2">
            ⏱️ <span>{duration}</span>
          </p>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div className="h-2 rounded-full bg-gray-300 relative">
            <div
              className="h-2 rounded-full bg-orange-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-right text-sm mt-1 text-gray-600">{progress}%</p>
        </div>

        {/* Button */}
        <button className="bg-orange-500 text-white w-[150px] py-3 rounded-full mt-4 text-[17px] font-medium">
          Join Now
        </button>
      </div>

      {/* Right image */}
      <div>
        <img
          src="https://triple-slider.uiinitiative.com/images/thor-ragnarok.jpg"
          alt="right-side"
          style={{
            width: "329px",
            height: "100%",
            objectFit: "cover",
            borderRadius: "18px",
          }}
        />
      </div>
    </div>
  );
};

export default CampaignCard;
