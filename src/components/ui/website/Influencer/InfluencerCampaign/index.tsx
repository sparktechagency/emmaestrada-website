import AllCampaigns from "./AllCampaigns";
import CampaignHeader from "./CampaignHeader";
import Container from "@/components/shared/Container";
import MyCampaigns from "./MyCampaigns";

const InfluencerCampaign = ({campaignType, status, queryString }: any) => {  
  return (
    <div>
      <Container>
        <CampaignHeader />
        <div className="mb-10">
          {campaignType === "my-submissions" ? (
            <MyCampaigns status={status} queryString={queryString}/>
          ) : (
            <AllCampaigns queryString={queryString}/>
          )}
        </div>
        
      </Container>
    </div>
  );
};

export default InfluencerCampaign;
