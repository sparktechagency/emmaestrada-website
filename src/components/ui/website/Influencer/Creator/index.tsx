import Container from '@/components/shared/Container'
import React from 'react'
import CreatorHeader from './CreatorHeader'

import CreatorFollowedInfluencer from './CreatorFollowedInfluencer'
import CreatorAllInfluencer from './CreatorAllInfluencer'
import { CampaignTabGroup } from '../InfluencerCampaign/CampaignTabGroup'
import CreatorPopularInfluencer from './CreatorPopularInfluencer'

const Creator = ({type}: any) => {
    return (
        <div>
            <Container >
                <CreatorHeader />
                 <CampaignTabGroup
                tabs={[
                    { label: 'Popular Influencer', value: 'popular-influencer' },
                    { label: 'Followed Influencer', value: 'followed-influencer' },
                    { label: 'All Influencer', value: 'all-influencers' },
                ]}
                queryParam="type"
            />
                {type === 'popular-influencer' ? <CreatorPopularInfluencer/> : type === 'followed-influencer' ? < CreatorFollowedInfluencer />  : type === 'all-influencers' ? < CreatorAllInfluencer/>: <CreatorPopularInfluencer/>}  
            
            
            </Container>
        </div>
    )
}

export default Creator