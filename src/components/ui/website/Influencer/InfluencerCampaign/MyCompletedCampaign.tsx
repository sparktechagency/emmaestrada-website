import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReviewButtonWithModal from "../../promotor/PromotorCampaignDetails/CampaignSubmission/ReviewButtonWithModal";

const MyCompletedCampaign = ({ campaigns }: { campaigns: any }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
        {campaigns?.map((campaign: any) => (
          <div className="" key={campaign._id}>
            <ACampaignCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCompletedCampaign;

const ACampaignCard = ({}) => {
  const progress = 20;

  return (
    <div className="rounded-2xl shadow-md bg-[#FFF8F3] p-5 space-y-4">
      {/* Top Section */}
      <div className="flex justify-between gap-3">
        <Image
          src={"/images/profile21.jpg"}
          alt="profile"
          width={56}
          height={56}
          className="rounded-xl object-cover"
        />

        <div>
          <div className="flex gap-2 mt-1">
            <span className="px-3 py-1 text-xs rounded-full border border-purple-400 text-purple-600">
              CLIPPING
            </span>
            <span className="px-3 py-1 text-xs rounded-full border border-pink-400 text-pink-600">
              MUSIC
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-1 text-end">1 day ago</p>
        </div>
      </div>

      {/* Creator Row */}
      <div className="">
        <h3 className="font-semibold text-lg leading-tight">Feel the Vibe</h3>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">Mr. Nadir</span>
          <img src="/tiktokBlack.png" width={16} />
          <img src="/instagram.png" width={16} />
        </div>
      </div>

      {/* Budget & Rate */}
      <div className="flex justify-between text-sm font-medium">
        <span className="text-gray-700">$2087.40 / 4087.40</span>
        <span className="text-gray-700">$5.00 / 1k views</span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-orange-500" style={{ width: `30%` }} />
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <p className="font-semibold">18%</p>
          <p className="text-gray-500 text-xs">Approval</p>
        </div>
        <div>
          <p className="font-semibold">343k</p>
          <p className="text-gray-500 text-xs">Views</p>
        </div>
        <div>
          <p className="font-semibold">$100</p>
          <p className="text-gray-500 text-xs">Paid</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center gap-3 justify-between">
        <Button className={`w-1/2 py-3 rounded-full text-sm font-medium`}>
          Completed
        </Button>
        <div className="w-1/2">
          <ReviewButtonWithModal />
        </div>
      </div>
    </div>
  );
};
