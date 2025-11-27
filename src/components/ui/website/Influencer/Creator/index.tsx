import Container from '@/components/shared/Container'
import React from 'react'
import CreatorHeader from './CreatorHeader'
import CreatorPopularArtists from './CreatorPopularArtists'
import CreatorFollowedArtist from './CreatorFollowedArtist'
import CreatorAllArtists from './CreatorAllArtists'
import { CampaignTabGroup } from '../InfluencerCampaign/CampaignTabGroup'

const Creator = ({type}: any) => {
    return (
        <div>
            <Container >
                <CreatorHeader />
                 <CampaignTabGroup
                tabs={[
                    { label: 'Popular Artists', value: 'popular-artist' },
                    { label: 'Followed Artists', value: 'followed-artist' },
                    { label: 'All Artists', value: 'all-artists' },
                ]}
                queryParam="type"
            />
                {type === 'popular-artist' ? <CreatorPopularArtists/> : type === 'followed-artist' ? < CreatorFollowedArtist />  : type === 'all-artists' ? < CreatorAllArtists/>: <CreatorPopularArtists/>}  
            
            
            </Container>
        </div>
    )
}

export default Creator