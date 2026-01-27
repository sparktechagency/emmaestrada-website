// MyCampaignList.tsx
import CampaignCard from "./CampaignCard";

interface Props {
  campaigns: any[];
}

const MyCampaignList = ({ campaigns }: Props) => {  
  if (!campaigns?.length) {
    return <p className="text-center text-gray-500">No campaigns found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign._id} campaign={campaign ?? campaign?.campaignId} />
      ))}
    </div>
  );
};

export default MyCampaignList;
