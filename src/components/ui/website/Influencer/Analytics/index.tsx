import Container from '@/components/shared/Container'
import AnalyticsCharts from './AnalyticsCharts'
import AnalyticsPlatformStatistics from './AnalyticsPlatformStatistics'
import AnalyticsStatics from './AnalyticsStatics'
import AnalyticsWithdrawalHistory from './AnalyticsWithdrawalHistory'
import AnayticsHeader from './AnayticsSummary'

const Analytics = () => {
  return (
    <div>
        <Container>
            <AnayticsHeader />
             <AnalyticsStatics />
             <AnalyticsWithdrawalHistory />            
            <AnalyticsCharts />                  
            <AnalyticsPlatformStatistics />
        </Container>
    </div>
  )
}

export default Analytics