import React from "react";
import { CampaignTabGroup } from "./CampaignTabGroup";
import MyPendingCampaigns from "./MyPendingCampaigns";
import MyCanceledCampaigns from "./MyCanceledCampaigns";
import MyAcceptedCampaigns from "./MyAcceptedCampaigns";
import MyCompletedCampaign from "./MyCompletedCampaign";
import { myFetch } from "@/utils/myFetch";

const MyCampaigns = async ({
  status,
  campaignType,
}: {
  status: string;
  campaignType: string;
}) => {
  const { data: campaigns } = await myFetch(
    `/campaigns/active-campaigns?status=${status ? status : "active"}`
  );
  console.log(campaigns?.data?.result);
  return (
    <div>
      <CampaignTabGroup
        tabs={[
          { label: "Pending", value: "pending" },
          { label: "Accepted", value: "accepted" },
          { label: "Canceled", value: "canceled" },
          { label: "Completed", value: "completed" },
        ]}
        queryParam="status"
      />
      {status === "pending" ? (
        <MyPendingCampaigns campaigns={campaigns?.data?.result} />
      ) : status === "accepted" ? (
        <MyAcceptedCampaigns campaigns={campaigns?.data?.result} />
      ) : status === "canceled" ? (
        <MyCanceledCampaigns campaigns={campaigns?.data?.result} />
      ) : status === "completed" ? (
        <MyCompletedCampaign campaigns={campaigns?.data?.result} />
      ) : (
        <MyPendingCampaigns campaigns={campaigns?.data?.result} />
      )}
    </div>
  );
};

export default MyCampaigns;
