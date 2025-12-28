import Container from "@/components/shared/Container";
import CreatorHeader from "./CreatorHeader";

import CreatorList from "@/components/shared/CreatorList";
import { CampaignTabGroup } from "../InfluencerCampaign/CampaignTabGroup";
import CreatorAllInfluencer from "./CreatorAllInfluencer";
import CreatorFollowedInfluencer from "./CreatorFollowedInfluencer";
import CreatorPopularInfluencer from "./CreatorPopularInfluencer";

const Creator = ({
  data,
  type,
  PopularCreator,
  followedCreator,
  allCreator,
}: any) => {

  console.log("Creator", data);
  
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
        {/* {type === "popular" ? (
          <CreatorPopularInfluencer popularCreator={PopularCreator} />
        ) : type === "followed" ? (
          <CreatorFollowedInfluencer followedCreator={followedCreator} />
        ) : type === "all" ? (
          <CreatorAllInfluencer allCreator={allCreator} />
        ) : (
          <CreatorPopularInfluencer PopularCreator={PopularCreator} />
        )} */}

        <CreatorList creatorData={data}/>
      </Container>
    </div>
  );
};

export default Creator;
