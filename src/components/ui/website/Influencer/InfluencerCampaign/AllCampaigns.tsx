import React from "react";
import { myFetch } from "@/utils/myFetch";
import MyCampaignList from "@/components/shared/MyCampaignList";
import ManagePagination from "@/components/shared/ManagePagination";

const AllCampaigns = async ({ queryString }: { queryString: string }) => {


  const url2 = queryString
    ? `/campaigns/active-campaigns?${queryString}`
    : `/campaigns/active-campaigns`;

  const data = await myFetch(url2);

  return (
    <div>
      <MyCampaignList campaigns={data?.data} />
      <ManagePagination meta={data?.meta} />
    </div>
  );
};

export default AllCampaigns;