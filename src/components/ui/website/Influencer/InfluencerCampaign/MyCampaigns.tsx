import ManagePagination from "@/components/shared/ManagePagination";
import { myFetch } from "@/utils/myFetch";
import { CheckCircle, Clock, Trophy, XCircle } from "lucide-react";
import { CampaignTabGroup } from "./CampaignTabGroup";
import SubmittedCampaignsTabs from "./SubmittedCampaignsTabs";

const MyCampaigns = async ({
  status,   
  queryString
}: {
  status: string,  
  queryString: string
}) => {
  
  const submissionData = await myFetch(
    `/submissions/my-submissions?status=${status ? status : "pending"}${queryString}`
  );
  
  const hasSubmissions = submissionData?.data && submissionData.data.length > 0;
  
  // Status-specific empty state content
  const emptyStateConfig = {
    pending: {
      icon: Clock,
      title: "No Pending Submissions",
      description: "You don't have any pending campaign submissions waiting for review."
    },
    accepted: {
      icon: CheckCircle,
      title: "No Accepted Submissions",
      description: "You don't have any accepted campaign submissions yet."
    },
    cancelled: {
      icon: XCircle,
      title: "No Cancelled Submissions",
      description: "You don't have any cancelled campaign submissions."
    },
    completed: {
      icon: Trophy,
      title: "No Completed Submissions",
      description: "You haven't completed any campaign submissions yet."
    }
  };
  
  const currentStatus = status || "pending";
  const EmptyIcon = emptyStateConfig[currentStatus as keyof typeof emptyStateConfig]?.icon || Clock;
  const emptyTitle = emptyStateConfig[currentStatus as keyof typeof emptyStateConfig]?.title;
  const emptyDescription = emptyStateConfig[currentStatus as keyof typeof emptyStateConfig]?.description;
  
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

      {hasSubmissions ? (
        <>
          <SubmittedCampaignsTabs
            submissions={submissionData.data}
            connectedPlatforms={["instagram", "tiktok", "youtube"]}
          />
          <ManagePagination meta={submissionData?.meta} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4 py-12">
          <div className="bg-gray-100 rounded-full p-6 mb-6">
            <EmptyIcon className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {emptyTitle}
          </h3>
          <p className="text-gray-600 max-w-md">
            {emptyDescription}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyCampaigns;