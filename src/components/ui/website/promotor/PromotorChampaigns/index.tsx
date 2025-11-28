import React from 'react'
import PCampaignHeader from './PCampaignHeader'
import PActiveChampaigns from './PActiveChampaigns'
import PUpcomingChampaigns from './PUpcomingChampaigns'
import PPastChampaigns from './PPastChampaigns'
import Container from '@/components/shared/Container'

const PromotorChampaigns = ({status}: {status?: string}) => {
  return (
    <Container>
      <div className="pb-16">
      <PCampaignHeader />
      {status === 'active' ? <PActiveChampaigns />: status === 'upcoming' ? < PUpcomingChampaigns /> :  status === 'past' ? < PPastChampaigns />: <PActiveChampaigns/>}  
      </div>
    </Container>
  )
}

export default PromotorChampaigns