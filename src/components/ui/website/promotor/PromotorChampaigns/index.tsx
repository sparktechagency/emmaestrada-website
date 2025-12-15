import React from 'react'
import PCampaignHeader from './PCampaignHeader'
import PActiveChampaigns from './PActiveChampaigns'
import PUpcomingChampaigns from './PUpcomingChampaigns'
import PPastChampaigns from './PPastChampaigns'
import Container from '@/components/shared/Container'
import CreatorPagination from '../../Influencer/Creator/CreatorPagination'
import { CampaignTabGroup } from '../../Influencer/InfluencerCampaign/CampaignTabGroup'
import CampaingsAddForm from '../CampaingsAddForm'
import CampaignCreateButton from '../../Influencer/InfluencerCampaign/CampaignCreateButton'

const PromotorChampaigns = ({ status }: { status?: string }) => {
  return (
    <Container>
      <div className="pb-16">
        <PCampaignHeader />
        <div className="grid md:flex grid-cols-1 gap-2 items-center justify-between">
          <CampaignTabGroup
            tabs={[
              { label: 'Active', value: 'active' },
              { label: 'Upcoming', value: 'upcoming' },
              { label: 'Past', value: 'past' },
            ]}
            queryParam="status"
          />
          <CampaignCreateButton />
        </div>


        {status === 'active' ? <PActiveChampaigns /> :
          status === 'upcoming' ? < PUpcomingChampaigns /> :
            status === 'past' ? < PPastChampaigns /> :
              status === 'create-campaign' ? <CampaingsAddForm /> :
                <PActiveChampaigns />}
      </div>

      {/* { !['upcoming', 'create-campaign'].includes(status?.toString()) && <CreatorPagination />} */}
      {status && !['upcoming', 'create-campaign'].includes(status) && (
        <CreatorPagination />
      )}

    </Container>
  )
}

export default PromotorChampaigns