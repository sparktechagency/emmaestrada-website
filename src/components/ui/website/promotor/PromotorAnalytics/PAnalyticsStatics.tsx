import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpRight,
  DollarSign,
  Eye,
  Music,
  TrendingUp,
} from "lucide-react"
import { myFetch } from '@/utils/myFetch'


const PAnalyticsStatics = async () => {

  const analyticsData = await myFetch("/analytics");
  const { data } = analyticsData;

  console.log("AnalyticsStatics", data);
  
  return (
    <div className="my-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<DollarSign />}
          iconBg="bg-green-500"
          title="Total Budget"
          value={`${data?.totalRevenue?.value}`}
          badge={`${data?.totalRevenue?.growthRate}`}
        />
        <StatCard
          icon={<Eye />}
          iconBg="bg-blue-500"
          title="Active Campaigns"
          value={`${data?.activeUsers?.value}`}
          badge={`${data?.activeUsers?.growthRate}`}
        />
        <StatCard
          icon={<Music />}
          iconBg="bg-purple-500"
          title="Total Campaigns"
          value={`${data?.activeCampaigns?.value}`}
          badge={`${data?.activeCampaigns?.growthRate}`}
        />
         <StatCard
          icon={<TrendingUp />}
          iconBg="bg-red-500"
          title="Total Submissions"
          value={`${data?.totalGrowth?.value}`}
          badge={`${data?.totalGrowth?.growthRate}`}
        />

        {/* <StatCard
          icon={<TrendingUp />}
          iconBg="bg-red-500"
          title="Total Submission"
          value={`$${data?.totalSubmissions?.value}`}
          badge={`$${data?.totalSubmissions?.growthRate}`}
        /> */}
       
      </div>

    </div>
  )
}

export default PAnalyticsStatics


/* ================= STAT CARD ================= */

type StatCardProps = {
  icon: React.ReactNode
  iconBg: string
  title: string
  value: string
  badge: string
  negative?: boolean
}

function StatCard({
  icon,
  iconBg,
  title,
  value,
  badge,
  negative,
}: StatCardProps) {
  return (
    <Card className="rounded-2xl bg-orange-300 ">
      <CardContent className="flex flex-col justify-between h-full">
        <div className="flex items-start justify-between">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${iconBg}`}
          >
            {icon}
          </div>          
        </div>

        <div className="mt-3">
          <p className="text-white/80 text-sm">{title}</p>
          <h2 className="text-3xl font-bold text-white mt-1">{value}</h2>
        </div>
      </CardContent>
    </Card>
  )
}