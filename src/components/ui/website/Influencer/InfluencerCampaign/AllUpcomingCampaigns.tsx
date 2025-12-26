import CampaignCard from "@/components/shared/CampaignCard";
import React from "react";

const AllUpcomingCampaigns = ({ campaigns }: { campaigns: any }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
        {campaigns?.map((campaign: any) => (
          <div className="" key={campaign._id}>
            <CampaignCard campaign={campaign} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUpcomingCampaigns;
