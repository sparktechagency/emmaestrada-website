import Container from '@/components/shared/Container'
import React from 'react'
import AnayticsHeader from './AnayticsSummary'
import AnalyticsStatics from './AnalyticsStatics'
import AnalyticsCampaignRankings from './AnalyticsCampaignRankings'
import AnalyticsRevenueStatistics from './AnalyticsRevenueStatistics'
import AnalyticsCharts from './AnalyticsCharts'
import AnalyticsPlatformStatistics from './AnalyticsPlatformStatistics'

const Analytics = () => {
  return (
    <div>
        <Container>
            <AnayticsHeader />
             <AnalyticsStatics />
            <AnalyticsCampaignRankings />            
            <AnalyticsCharts />                  
            <AnalyticsPlatformStatistics />
        </Container>
    </div>
  )
}

export default Analytics