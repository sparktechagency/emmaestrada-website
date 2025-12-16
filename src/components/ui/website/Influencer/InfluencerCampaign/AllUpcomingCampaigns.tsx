import CampaignCard from '@/components/shared/CampaignCard'
import React from 'react'

const AllUpcomingCampaigns = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div className="" key={i}>
            <CampaignCard
              name="Feel the Vibe"
              budget="$1000"
              influencers="25/25"
              dateRange="01/06/2024 - 30/06/2024"
              duration="30 days"
              progress={20}
              profileImg="/dj.jpg"
              rightImg="/dj-right.jpg"
              username="rikodj890"
              displayName="DJ Nadir"
              isPrivate={i % 2 !== 0}
              status="upcoming"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllUpcomingCampaigns