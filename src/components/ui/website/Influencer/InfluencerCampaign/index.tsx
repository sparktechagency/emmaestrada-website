import AllCampaigns from "./AllCampaigns";
import CampaignHeader from "./CampaignHeader";
import Container from "@/components/shared/Container";
import MyCampaigns from "./MyCampaigns";
import CreatorPagination from "../Creator/CreatorPagination";

const InfluencerCampaign = ({ campaignType, status }: any) => {
  console.log(campaignType, status);
  return (
    <div>
      <Container>
        <CampaignHeader />
        <div className="mb-10">
          {campaignType === "my-campaigns" ? (
            <MyCampaigns status={status} campaignType={campaignType} />
          ) : (
            <AllCampaigns status={status} campaignType={campaignType} />
          )}
        </div>
        <CreatorPagination />
      </Container>
    </div>
  );
};

export default InfluencerCampaign;
