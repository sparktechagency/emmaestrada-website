'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { Loader2 } from "lucide-react"
import { myFetch } from '@/utils/myFetch'
import { toast } from 'sonner'

const platformColors = {
  Tiktok: "#111",
  Instagram: "#fb7185",
  Youtube: "#f97316",
  Twitter: "#1DA1F2",
  Facebook: "#4267B2",
}

export default function AnalyticsPlatformDistribution() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    fetchPlatformDistribution()
  }, [])

  const fetchPlatformDistribution = async () => {
    try {
      setLoading(true)
      const response = await myFetch('/analytics/platform-distribution')

      if (response.success && response.data) {
        const formattedData = response.data.map((item:any) => ({
          name: item.platform,
          value: parseFloat(item.percentage),
          // @ts-ignore
          color: platformColors[item.platform] || "#94a3b8",
          totalPayout: item.totalPayout,
          submissions: item.submissions,
        }))
        setData(formattedData)
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      toast.error('An error occurred while fetching platform data')      
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-orange-50 rounded-2xl h-full">
        <CardHeader>
          <CardTitle>Platform Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="flex items-center">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        </CardContent>
      </Card>
    )
  }


  return (
    <Card className="bg-orange-50 rounded-2xl h-full">
      <CardHeader>
        <CardTitle>Platform Distribution</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}            
              outerRadius={100}
              dataKey="value"
              cx="50%"
              cy="50%"                
              fill="#8884d8"          
            >
              {data.map((entry:any, i) => (
                <Cell key={i} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-4 -mt-10! md:-mt-3 text-sm">
          {data.map((d:any) => (
            <div key={d.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: d.color }}
              />
              {d.name}: {d.value}%
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}