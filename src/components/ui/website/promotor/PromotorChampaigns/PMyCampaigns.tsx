import CampaignCard from "@/components/shared/CampaignCard";

const PMyCampaigns = async ({ campaigns }: any) => {
    if (!campaigns?.length) {
    return <p className="text-center text-gray-500">No campaigns found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {campaigns.map((campaign:any) => (
        <CampaignCard key={campaign._id} campaign={campaign} />
      ))}
    </div>
  );
}

export default PMyCampaigns;