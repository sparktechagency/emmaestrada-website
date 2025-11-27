import React from 'react'
import AnalyticsRevenueStatistics from './AnalyticsRevenueStatistics'
import AnalyticsPlatformDistribution from './AnalyticsPlatformDistribution'

const AnalyticsCharts = () => {
  return (
    <div className='flex flex-col md:flex-row items-center gap-7 md:gap-5 my-5'>
        <div className="w-full md:w-3/5">
        <AnalyticsRevenueStatistics />
        </div>
        <div className="w-full md:w-2/5">
        <AnalyticsPlatformDistribution />
        </div>
    </div>
  )
}

export default AnalyticsCharts