import React from "react";
import { myFetch } from "@/utils/myFetch";
import MyCampaignList from "@/components/shared/MyCampaignList";

const AllCampaigns = async ({ queryString }: { queryString: string }) => {


  const url2 = queryString
    ? `/campaigns/active-campaigns?${queryString}`
    : `/campaigns/active-campaigns`;

  const { data: campaigns2 } = await myFetch(url2);

  return (
    <div>
      <MyCampaignList campaigns={campaigns2?.data} />
    </div>
  );
};

export default AllCampaigns;