import InfluencerCampaign from "@/components/ui/website/Influencer/InfluencerCampaign";
import { myFetch } from "@/utils/myFetch";



const Page = async ({ searchParams }: any) => {
  const params = await searchParams;
  
  const {campaignType, status, ...rest} = params;
  const queryString = new URLSearchParams(rest).toString();

  return (
    <InfluencerCampaign
      campaignType={campaignType}
      status={status}
      queryString={queryString}
    />
  );
};

export default Page;
