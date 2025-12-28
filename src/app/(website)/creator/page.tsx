import InfluencerCampaign from "@/components/ui/website/Influencer/InfluencerCampaign";
import { myFetch } from "@/utils/myFetch";



const Page = async ({ searchParams }: any) => {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();

  return (
    <InfluencerCampaign
      campaignType={params.campaignType}
      status={params.status}
      queryString={queryString}
    />
  );
};

export default Page;
