import React from "react";
import { CampaignTabGroup } from "./CampaignTabGroup";
import ActiveCampaigns from "./ActiveCampaigns";
import AllUpcomingCampaigns from "./AllUpcomingCampaigns";
import { myFetch } from "@/utils/myFetch";
import MyCampaignList from "@/components/shared/MyCampaignList";

const AllCampaigns = async () => {  
  const { data: campaigns } = await myFetch(
    `/campaigns/active-campaigns`
  );

  return (
    <div>
       <MyCampaignList campaigns={campaigns?.data?.result} />
    </div>
  );
};

export default AllCampaigns;
