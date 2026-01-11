import React from 'react'
import PCreatorHeader from './PCreatorHeader'
import Container from '@/components/shared/Container'
import { CampaignTabGroup } from '../../Influencer/InfluencerCampaign/CampaignTabGroup'
import PCreatorsList from './PCreatorsList'

const PCreatorsMain = ({
  data, 
}: any) => {
  return (
    <div>
<Container>
        <PCreatorHeader />
        <CampaignTabGroup
          tabs={[
            { label: "Popular", value: "popular" },
            { label: "Followed", value: "followed" },
            { label: "All Creator", value: "all" },
          ]}
          queryParam="type"
        />       
        <PCreatorsList creatorData={data}/>
      </Container>
    </div>
  )
}

export default PCreatorsMain