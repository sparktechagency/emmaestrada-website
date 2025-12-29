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
import { myFetch } from '@/utils/myFetch'
import CampaignCard from '@/components/shared/CampaignCard'
import MyCampaignList from '@/components/shared/MyCampaignList'
import PMyCampaigns from './PMyCampaigns'

const PromotorChampaigns = async ({ queryString, status }: { queryString?: string, status?: string }) => {
  const baseUrl = status === "upcoming" ? "/campaigns/unpaid-campaigns" : "/campaigns/my-campaigns";

  const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
  const { data: campaigns } = await myFetch(url);

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

        {status === 'create-campaign' ? <CampaingsAddForm /> :
          <PMyCampaigns campaigns={campaigns?.data?.result} />}
      </div>

      {/* { !['upcoming', 'create-campaign'].includes(status?.toString()) && <CreatorPagination />} */}
      {status && !['upcoming', 'create-campaign'].includes(status) && (
        <CreatorPagination />
      )}

    </Container>
  )
}

export default PromotorChampaigns