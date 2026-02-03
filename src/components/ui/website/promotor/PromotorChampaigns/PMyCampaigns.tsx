import CampaignCard from "@/components/shared/CampaignCard";
import UpcomingCampaignCard from "./UpcomingCampaignCard";

const PMyCampaigns = async ({ campaigns, status }: any) => {
    if (!campaigns?.length) {
    return <p className="text-center text-gray-500">No campaigns found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
      {campaigns.map((campaign:any) => (
       status == "inactive" ? <UpcomingCampaignCard key={campaign._id} campaign={campaign} /> 
       :  <CampaignCard key={campaign._id} campaign={campaign} label="Manage Campaign" />
      ))}
      
    </div>
  );
}

export default PMyCampaigns;