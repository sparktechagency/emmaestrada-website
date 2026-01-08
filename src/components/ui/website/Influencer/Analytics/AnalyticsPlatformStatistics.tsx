'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { myFetch } from '@/utils/myFetch'

export default function AnalyticsPlatformStatistics() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlatformStatistics()
  }, [])

  const fetchPlatformStatistics = async () => {
    try {
      setLoading(true)
      const response = await myFetch('/analytics/platform-stats')

      if (response.success && response.data) {
        setData(response.data)
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      toast.error('An error occurred while fetching platform statistics')
      console.error('Error fetching platform statistics:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  // Prepare chart data
  const chartData = data.map((item: any) => ({
    platform: item.platform,
    totalViews: item.totalViews,
    websiteViews: item.avgWebsiteViews,
  }))

  // Prepare table data
  const tableData = data.map((item: any) => ({
    platform: item.platform,
    totalViews: formatNumber(item.totalViews),
    websiteViews: formatNumber(item.avgWebsiteViews),
    engagement: item.engagementRate,
  }))

  // Custom tooltip for better mobile display
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg text-xs sm:text-sm">
          <p className="font-semibold mb-1">{payload[0].payload.platform}</p>
          <p className="text-gray-700">
            <span className="font-medium">Total Views:</span>{' '}
            {formatNumber(payload[0].value)}
          </p>
          <p className="text-orange-600">
            <span className="font-medium">Website Views:</span>{' '}
            {formatNumber(payload[1].value)}
          </p>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <Card className="bg-orange-50 rounded-2xl mb-20">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Platform Statistics</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="flex items-center">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Loading statistics...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-orange-50 rounded-2xl mb-20">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Platform Statistics</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* ================= BAR CHART ================= */}
        <div className="w-full h-[250px] sm:h-[300px]px-2 sm:px-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              barGap={4}
              margin={{ 
                top: 10, 
                right: 10, 
                left: -20, 
                bottom: 20 
              }}
            >
              <XAxis 
                dataKey="platform" 
                tick={{ fontSize: 11 }}
                tickMargin={8}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis 
                tick={{ fontSize: 11 }}
                tickFormatter={formatNumber}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="rect"
                iconSize={12}
              />
              <Bar
                dataKey="totalViews"
                fill="#181818"
                radius={[6, 6, 0, 0]}
                name="Total Views"
                maxBarSize={60}
              />
              <Bar
                dataKey="websiteViews"
                fill="#fb6b2f"
                radius={[6, 6, 0, 0]}
                name="Website Views"
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Platform</TableHead>
                  <TableHead className="text-xs sm:text-sm whitespace-nowrap">
                    Total Views
                  </TableHead>
                  <TableHead className="text-xs sm:text-sm whitespace-nowrap">
                    Website Views
                  </TableHead>
                  <TableHead className="text-right text-xs sm:text-sm whitespace-nowrap">
                    Engagements
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tableData.length > 0 ? (
                  tableData.map((row) => (
                    <TableRow key={row.platform}>
                      <TableCell className="font-medium text-xs sm:text-sm">
                        <span className="flex items-center gap-1">
                          <span className="text-orange-500">●</span>
                          <span className="truncate max-w-[80px] sm:max-w-none">
                            {row.platform}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm">
                        {row.totalViews}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm">
                        {row.websiteViews}
                      </TableCell>
                      <TableCell className="text-right text-orange-600 font-semibold text-xs sm:text-sm">
                        {row.engagement}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell 
                      colSpan={4} 
                      className="text-center text-gray-500 text-xs sm:text-sm py-8"
                    >
                      No platform statistics available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}