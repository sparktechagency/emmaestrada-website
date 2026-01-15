import MyCampaignList from "@/components/shared/MyCampaignList";
import { myFetch } from "@/utils/myFetch";
import { CampaignTabGroup } from "./CampaignTabGroup";
import ManagePagination from "@/components/shared/ManagePagination";
import PlatformSubmissionTabs from "@/components/shared/PlatformSubmissionTabs";
import SubmittedCampaignsTabs from "./SubmittedCampaignsTabs";

const MyCampaigns = async ({
  status,   
  queryString
}: {
  status: string,  
  queryString: string
}) => {
  
  const  submissionData = await myFetch(
    `/submissions/my-submissions?status=${status ? status : "pending"}${queryString}`
  );  
  return (
    <div>
      <CampaignTabGroup
        tabs={[
          { label: "Pending", value: "pending" },
          { label: "Accepted", value: "accepted" },
          { label: "Cancelled", value: "cancelled" },
          { label: "Completed", value: "completed" },
        ]}
        queryParam="status"
      />

      {submissionData?.data && (
        <SubmittedCampaignsTabs
          submissions={submissionData.data}
          connectedPlatforms={["instagram", "tiktok", "youtube"]}
        />
      )}
      {/* <MyCampaignList campaigns={submissionData?.data} /> */}
      <ManagePagination meta={submissionData?.meta} />
    </div>
  );
};

export default MyCampaigns;
