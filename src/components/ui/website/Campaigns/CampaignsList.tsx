
import CampaignCard from "@/components/shared/CampaignCard";
import getProfile from "@/utils/getProfile";
import Link from "next/link";
import React from "react";

const CampaignsList = async({data}: {data:any}) => {
  const profile = await  getProfile()  
    
  return (
    <div>
      <div>
        <h1 className="title text-center mb-3">
          <span className="text-primary">Campaigns</span> on the Horizon
        </h1>
        <p className="textPara text-center max-w-6xl mx-auto mb-10">
          Explore our handpicked campaigns that are driving real impact,
          inspiring communities, and shaping the future. Stay updated with the
          initiatives that matter most.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  md:gap-x-4 gap-y-5">
           {data?.map((campaign: any) => (              
                <CampaignCard  key={campaign._id} campaign={campaign}  />              
            ))}        
      </div>
    </div>
  );
};

export default CampaignsList;
