import Container from '@/components/shared/Container'
import React from 'react'
import AnalyticsStatics from '../../Influencer/Analytics/AnalyticsStatics'
import PAnalyticsCampaignRankings from './PAnalyticsCampaignRankings'
import AnalyticsCharts from '../../Influencer/Analytics/AnalyticsCharts'
import AnalyticsPlatformStatistics from '../../Influencer/Analytics/AnalyticsPlatformStatistics'
import AnayticsSummary from '../../Influencer/Analytics/AnayticsSummary'
import PAnalyticsSummary from './PAnalyticsSummary'
import PAnalyticsStatics from './PAnalyticsStatics'
import PCreatorGrowths from './PCreatorGrowths'

const PromotorAnalytics = () => {
    return (
        <div>
            <Container> 
                <PAnalyticsSummary />               
                <PAnalyticsStatics />
                <PAnalyticsCampaignRankings />                
                <PCreatorGrowths />                
            </Container>
        </div>
    )
}

export default PromotorAnalytics