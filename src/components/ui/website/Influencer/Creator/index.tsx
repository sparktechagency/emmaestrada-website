import Container from "@/components/shared/Container";
import CreatorHeader from "./CreatorHeader";

import CreatorList from "@/components/shared/CreatorList";
import { CampaignTabGroup } from "../InfluencerCampaign/CampaignTabGroup";

const Creator = ({
  data, 
}: any) => {

  return (
    <div>
      <Container>
        <CreatorHeader />
        <CampaignTabGroup
          tabs={[
            { label: "Popular", value: "popular" },
            { label: "Followed", value: "followed" },
            { label: "All Creator", value: "all" },
          ]}
          queryParam="type"
        />       
        <CreatorList creatorData={data}/>
      </Container>
    </div>
  );
};

export default Creator;
