import MyCampaignList from "@/components/shared/MyCampaignList";
import { myFetch } from "@/utils/myFetch";
import { CampaignTabGroup } from "./CampaignTabGroup";

const MyCampaigns = async ({
  status,   
  queryString
}: {
  status: string,  
  queryString: string
}) => {

  const  data = await myFetch(
    `/submissions/my-submissions?status=${status ? status : "pending"}${queryString}`
  );
  console.log("filteredData", data);
  
  // const filteredData = campaigns?.data?.length > 0 ? campaigns?.data?.map((c:any)=>c.campaignId) : []
  
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

      <MyCampaignList campaigns={[]} />
    </div>
  );
};

export default MyCampaigns;
