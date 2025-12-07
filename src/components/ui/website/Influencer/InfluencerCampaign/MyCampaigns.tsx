import React from 'react'
import { CampaignTabGroup } from './CampaignTabGroup'
import MyPendingCampaigns from './MyPendingCampaigns'
import MyCanceledCampaigns from './MyCanceledCampaigns'
import MyAcceptedCampaigns from './MyAcceptedCampaigns'

const MyCampaigns = ({ status }: { status: string }) => {
  return (
    <div>
      <CampaignTabGroup
        tabs={[
          { label: 'Pending', value: 'pending' },
          { label: 'Accepted', value: 'accepted' },
          { label: 'Canceled', value: 'canceled' },
        ]}
        queryParam="status"
      />
      {status === "pending" ? <MyPendingCampaigns /> : status === "accepted" ? <MyAcceptedCampaigns /> : status === "canceled" ? <MyCanceledCampaigns /> : <MyPendingCampaigns />}      
    </div>
  )
}

export default MyCampaigns