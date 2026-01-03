import React from 'react'
import PendingSubmission from './PendingSubmission'
import AcceptedSubmission from './AcceptedSubmission'
import RejectedSubmission from './RejectedSubmission'
import { CampaignTabGroup } from '../../../Influencer/InfluencerCampaign/CampaignTabGroup'

const CampaignSubmission = ({status, campaignId}: {status?: string, campaignId: string}) => {
  return (
    <div>
      <div className="mt-5">
      <CampaignTabGroup
        tabs={[
          { label: 'Pending', value: 'pending' },
          { label: 'Approved', value: 'approved' },
          { label: 'Rejected', value: 'rejected' },
        ]}
        queryParam="status"
      />
      </div>
       {status === 'pending' ? <PendingSubmission campaignId={campaignId}/> 
       : status === 'approved' ? < AcceptedSubmission /> 
       : status === 'rejected' ? < RejectedSubmission/> : <PendingSubmission  campaignId={campaignId}/>}  
      
    </div>
  )
}

export default CampaignSubmission