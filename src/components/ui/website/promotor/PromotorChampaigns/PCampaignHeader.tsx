import React from 'react'
import { CampaignTabGroup } from '../../Influencer/InfluencerCampaign/CampaignTabGroup'

const PCampaignHeader = () => {
  return (
    <div>
      <div className="mb-6 pt-10">
        <h1 className={`mb-2 text-3xl font-semibold`}>Campaigns</h1>
        <p className="textPara">Browse and join music campaigns</p>
      </div>
      <CampaignTabGroup
        tabs={[
          { label: 'Active', value: 'active' },
          { label: 'Upcoming', value: 'upcoming' },
          { label: 'Past', value: 'past' },
        ]}
        queryParam="status"
      />
    </div>
  )
}

export default PCampaignHeader