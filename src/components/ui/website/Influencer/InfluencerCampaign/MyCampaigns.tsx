import MyCampaignList from "@/components/shared/MyCampaignList";
import { myFetch } from "@/utils/myFetch";
import { CampaignTabGroup } from "./CampaignTabGroup";

const MyCampaigns = async ({
  status,   
}: {
  status: string;  
}) => {
  
  const { data: campaigns } = await myFetch(
    `/submissions/my-submissions?status=${status ? status : "pending"}`
  );
  console.log("campaigns?.data?.result", campaigns?.data);
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

      <MyCampaignList campaigns={campaigns?.data?.data} />
    </div>
  );
};

export default MyCampaigns;
