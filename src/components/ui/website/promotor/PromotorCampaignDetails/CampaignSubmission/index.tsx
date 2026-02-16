import React from 'react'
import PendingSubmission from './PendingSubmission'
import AcceptedSubmission from './AcceptedSubmission'
import RejectedSubmission from './RejectedSubmission'
import { CampaignTabGroup } from '../../../Influencer/InfluencerCampaign/CampaignTabGroup'
import { myFetch } from '@/utils/myFetch'
import PlatformSubmissionTabs from '@/components/shared/PlatformSubmissionTabs'

const CampaignSubmission = async ({ status, campaignId }: { status?: string, campaignId: string }) => {
  const res = await myFetch(status ? `/submissions/campaign-submissions/${campaignId}?status=${status}`
    : `/submissions/campaign-submissions/${campaignId}`, { tags: ['campaign-submissions'] });
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

      {res?.data?.data?.length ? (
        <PlatformSubmissionTabs
          submissions={res?.data?.data}
          connectedPlatforms={["instagram", "tiktok", "youtube"]}
        />
      ) : <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-lg">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">No submissions have yet</h4>
        <p className="text-sm text-gray-500 max-w-sm">This creator hasn't submitted any content</p>
      </div>}
    </div>
  )
}

export default CampaignSubmission