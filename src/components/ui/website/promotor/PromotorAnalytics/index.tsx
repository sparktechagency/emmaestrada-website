import Container from '@/components/shared/Container'
import React from 'react'
import AnalyticsStatics from '../../Influencer/Analytics/AnalyticsStatics'
import AnalyticsCampaignRankings from '../../Influencer/Analytics/AnalyticsCampaignRankings'
import AnalyticsCharts from '../../Influencer/Analytics/AnalyticsCharts'
import AnalyticsPlatformStatistics from '../../Influencer/Analytics/AnalyticsPlatformStatistics'
import AnayticsSummary from '../../Influencer/Analytics/AnayticsSummary'

const PromotorAnalytics = () => {
    return (
        <div>
            <Container> 
                <AnayticsSummary />               
                <AnalyticsStatics />
                <AnalyticsCampaignRankings />
                <AnalyticsCharts />
                <AnalyticsPlatformStatistics />
            </Container>
        </div>
    )
}

export default PromotorAnalytics