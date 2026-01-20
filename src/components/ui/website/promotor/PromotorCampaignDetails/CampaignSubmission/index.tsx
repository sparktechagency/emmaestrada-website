import React from 'react'
import PendingSubmission from './PendingSubmission'
import AcceptedSubmission from './AcceptedSubmission'
import RejectedSubmission from './RejectedSubmission'
import { CampaignTabGroup } from '../../../Influencer/InfluencerCampaign/CampaignTabGroup'
import { myFetch } from '@/utils/myFetch'
import PlatformSubmissionTabs from '@/components/shared/PlatformSubmissionTabs'

const CampaignSubmission = async ({status, campaignId}: {status?: string, campaignId: string}) => {
    const res = await myFetch(status ? `/submissions/campaign-submissions/${campaignId}?status=${status}` 
      :  `/submissions/campaign-submissions/${campaignId}`, {tags: ['campaign-submissions']});
  return (
    <div>
      <div className="mt-5">
      <CampaignTabGroup
        tabs={[
          { label: 'Pending', value: 'pending' },
          { label: 'Approved', value: 'accepted' },
          { label: 'Rejected', value: 'cancelled' },
          { label: 'Completed', value: 'completed' },
        ]}
        queryParam="status"
      />
      </div>
       {/* {status === 'pending' ? <PendingSubmission submissions={res?.data?.data}/> 
       : status === 'approved' ? < AcceptedSubmission /> 
       : status === 'rejected' ? < RejectedSubmission/> : <PendingSubmission  submissions={res?.data?.data}/>}   */}
      
       {res?.data?.data && (
        <PlatformSubmissionTabs
          submissions={res?.data?.data}
          connectedPlatforms={["instagram", "tiktok", "youtube"]}
        />
      )}
    </div>
  )
}

export default CampaignSubmission