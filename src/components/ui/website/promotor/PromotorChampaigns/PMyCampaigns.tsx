import CampaignCard from "@/components/shared/CampaignCard";

const PMyCampaigns = async ({ campaigns }: any) => {
    if (!campaigns?.length) {
    return <p className="text-center text-gray-500">No campaigns found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
      {campaigns.map((campaign:any) => (
        <CampaignCard key={campaign._id} campaign={campaign} label="Manage Campaign" />
      ))}
      
    </div>
  );
}

export default PMyCampaigns;