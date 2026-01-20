import React from "react";
import { myFetch } from "@/utils/myFetch";
import MyCampaignList from "@/components/shared/MyCampaignList";
import ManagePagination from "@/components/shared/ManagePagination";
import { FolderOpen } from "lucide-react";

const AllCampaigns = async ({ queryString }: { queryString: string }) => {
  const url2 = queryString
    ? `/campaigns/active-campaigns?${queryString}`
    : `/campaigns/active-campaigns`;

  const data = await myFetch(url2);
  
  // Check if campaigns array is empty
  const hasCampaigns = data?.data && data.data.length > 0;

  return (
    <div>
      {hasCampaigns ? (
        <>
          <MyCampaignList campaigns={data?.data} />
          <ManagePagination meta={data?.meta} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <FolderOpen className="w-20 h-20 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Campaigns Found
          </h3>          
        </div>
      )}
    </div>
  );
};

export default AllCampaigns;