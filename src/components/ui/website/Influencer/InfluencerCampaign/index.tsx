import AllCampaigns from "./AllCampaigns";
import CampaignHeader from "./CampaignHeader";
import Container from "@/components/shared/Container";
import MyCampaigns from "./MyCampaigns";
import CreatorPagination from "../Creator/CreatorPagination";

const InfluencerCampaign = ({campaignType, status, queryString }: any) => {  
  return (
    <div>
      <Container>
        <CampaignHeader />
        <div className="mb-10">
          {campaignType === "my-campaigns" ? (
            <MyCampaigns status={status}/>
          ) : (
            <AllCampaigns queryString={queryString}/>
          )}
        </div>
        <CreatorPagination />
      </Container>
    </div>
  );
};

export default InfluencerCampaign;
