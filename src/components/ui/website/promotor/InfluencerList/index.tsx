import Container from '@/components/shared/Container'
import React from 'react'
import CreatorHeader from '../../Influencer/Creator/CreatorHeader'
import { CampaignTabGroup } from '../../Influencer/InfluencerCampaign/CampaignTabGroup'
import PAllInfluencer from './PAllInfluencer'
import PFollowedInfluencer from './PFollowedInfluencer'
import PPopularInfluencer from './PPopularInfluencer'

const InfluencerList = ({type, PopularCreator, followedCreator, allCreator}: any) => {
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

            {
            type === 'popular-influencer' ? 
            <PPopularInfluencer popularCreator={PopularCreator}/> : 
            type === 'followed-influencer' ? < PFollowedInfluencer followedCreator={followedCreator}/>  
            : type === 'all-influencers' ? < PAllInfluencer allCreator={allCreator}/>: <PPopularInfluencer PopularCreator={PopularCreator}/>}  
        </Container>
    )
}

export default InfluencerList