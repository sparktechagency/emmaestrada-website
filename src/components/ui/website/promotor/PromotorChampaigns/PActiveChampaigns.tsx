import CampaignCard from "@/components/shared/CampaignCard";
import Link from "next/link";
import React from "react";

const PActiveChampaigns = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div className="" key={i}>
            <Link href={`/promotor/campaigns/${i}`}>
              {/* <CampaignCard
                campaign={{
                  _id: `${i}`,
                  title: "Feel the Vibe",
                  budget: {
                    rewardRate: 25,
                    perViews: 1000,
                    minPayout: 100,
                    maxPayout: 1000,
                    flatPrice: 150,
                  },
                  platforms: ["TikTok", "Instagram"],
                  campaignAmount: 1000,
                  paidAmount: 200,
                  totalPaidOutAmount: 200,
                  contentType: "UGC",
                  genre: "Pop",
                  thumbnail: "/images/campaign-img.png",
                  profileImg: "/dj.jpg",
                  username: "rikodj890",
                  displayName: "DJ Nadir",                  
                  isJoined: false,
                  isPrivate: i % 2 !== 0,
                }}
              /> */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PActiveChampaigns;
