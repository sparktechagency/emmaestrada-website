import CampaignCard from "@/components/shared/CampaignCard";
import UpcomingCampaignCard from "./UpcomingCampaignCard";

const PMyCampaigns = async ({ campaigns, status }: any) => {
  if (!campaigns?.length) {
    return <p className="text-center text-gray-500">No campaigns found</p>;
  }

  return (
    <div className="">
     {status === "inactive" && <div className="relative mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-500 shadow"> 
      <p className="font-semibold">The campaign will become active once you have added budget to campaign! </p> 
      </div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
        {campaigns.map((campaign: any) => (
          status == "inactive" ? <UpcomingCampaignCard key={campaign._id} campaign={campaign} />
            : <CampaignCard key={campaign._id} campaign={campaign} label="Manage Campaign" />
        ))}

      </div>
    </div>

  );
}

export default PMyCampaigns;