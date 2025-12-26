import React from "react";
import { CampaignTabGroup } from "./CampaignTabGroup";
import ActiveCampaigns from "./ActiveCampaigns";
import AllUpcomingCampaigns from "./AllUpcomingCampaigns";
import { myFetch } from "@/utils/myFetch";

const AllCampaigns = async ({
  status,
  campaignType,
}: {
  status: string;
  campaignType: string;
}) => {
  console.log("status", status);
  const { data: campaigns } = await myFetch(
    `/campaigns/active-campaigns?status=${status ? status : "active"}`
  );

  return (
    <div>
      <CampaignTabGroup
        tabs={[
          { label: "Active", value: "active" },
          { label: "Upcoming", value: "upcoming" },
        ]}
        queryParam="status"
      />
      {status === "active" ? (
        <ActiveCampaigns campaigns={campaigns?.data?.result} />
      ) : status === "upcoming" ? (
        <AllUpcomingCampaigns campaigns={campaigns?.data?.result} />
      ) : (
        <ActiveCampaigns campaigns={campaigns?.data?.result} />
      )}
    </div>
  );
};

export default AllCampaigns;
