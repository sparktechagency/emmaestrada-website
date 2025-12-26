import CampaignCard from "@/components/shared/CampaignCard";
import Link from "next/link";

const MyAcceptedCampaigns = ({ campaigns }: { campaigns: any }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
        {campaigns?.map((campaign: any) => (
          <Link href={`/creator/${campaign._id}`} key={campaign._id}>
            <CampaignCard campaign={campaign} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyAcceptedCampaigns;
