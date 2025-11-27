import React from 'react'
import { CampaignTabGroup } from './CampaignTabGroup'
import ActiveCampaigns from './ActiveCampaigns'
import AllUpcomingCampaigns from './AllUpcomingCampaigns'

const AllCampaigns = ({status}: {status: string}) => {
    console.log('status')
    return (
        <div>
            <CampaignTabGroup
                tabs={[
                    { label: 'Active', value: 'active' },
                    { label: 'Upcoming', value: 'upcoming' },
                ]}
                queryParam="status"
            />
            {status === "active" ? <ActiveCampaigns /> : status === "upcoming" ? <AllUpcomingCampaigns /> : <ActiveCampaigns /> }
        </div>
    )
}

export default AllCampaigns


