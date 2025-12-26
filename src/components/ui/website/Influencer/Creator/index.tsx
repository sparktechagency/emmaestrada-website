import Container from "@/components/shared/Container";
import React from "react";
import CreatorHeader from "./CreatorHeader";

import CreatorFollowedInfluencer from "./CreatorFollowedInfluencer";
import CreatorAllInfluencer from "./CreatorAllInfluencer";
import { CampaignTabGroup } from "../InfluencerCampaign/CampaignTabGroup";
import CreatorPopularInfluencer from "./CreatorPopularInfluencer";
import CreatorPagination from "./CreatorPagination";
import ManagePagination from "@/components/shared/ManagePagination";

const Creator = ({
  type,
  PopularCreator,
  followedCreator,
  allCreator,
}: any) => {
  return (
    <div>
      <Container>
        <CreatorHeader />
        <CampaignTabGroup
          tabs={[
            { label: "Popular", value: "popular-influencer" },
            { label: "Followed", value: "followed-influencer" },
            { label: "All Creator", value: "all-influencers" },
          ]}
          queryParam="type"
        />
        {type === "popular-influencer" ? (
          <CreatorPopularInfluencer popularCreator={PopularCreator} />
        ) : type === "followed-influencer" ? (
          <CreatorFollowedInfluencer followedCreator={followedCreator} />
        ) : type === "all-influencers" ? (
          <CreatorAllInfluencer allCreator={allCreator} />
        ) : (
          <CreatorPopularInfluencer PopularCreator={PopularCreator} />
        )}
      </Container>
    </div>
  );
};

export default Creator;
