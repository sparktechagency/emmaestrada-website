import Container from '@/components/shared/Container'
import React from 'react'
import CreatorHeader from '../../Influencer/Creator/CreatorHeader'
import { CampaignTabGroup } from '../../Influencer/InfluencerCampaign/CampaignTabGroup'
import PAllInfluencer from './PAllInfluencer'
import PFollowedInfluencer from './PFollowedInfluencer'
import PPopularInfluencer from './PPopularInfluencer'

const InfluencerList = ({type}: any) => {
    return (
        <Container>
            <CreatorHeader />
            <CampaignTabGroup
                tabs={[
                    { label: 'Popular Creator', value: 'popular-influencer' },
                    { label: 'Followed Creator', value: 'followed-influencer' },
                    { label: 'All Creator', value: 'all-influencers' },
                ]}
                queryParam="type"
            />

            {type === 'popular-influencer' ? <PPopularInfluencer/> : type === 'followed-influencer' ? < PFollowedInfluencer />  : type === 'all-influencers' ? < PAllInfluencer/>: <PPopularInfluencer/>}  
        </Container>
    )
}

export default InfluencerList