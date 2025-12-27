import MyCampaignList from "@/components/shared/MyCampaignList";
import { myFetch } from "@/utils/myFetch";
import { CampaignTabGroup } from "./CampaignTabGroup";

const MyCampaigns = async ({
  status,  
}: {
  status: string;  
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

      <MyCampaignList campaigns={campaigns?.data?.result} />
    </div>
  );
};

export default MyCampaigns;
