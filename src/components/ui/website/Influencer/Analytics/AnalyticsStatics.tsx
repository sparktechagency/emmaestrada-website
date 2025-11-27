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


const AnalyticsStatics = () => {
  return (
    <div className="my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<DollarSign />}
          iconBg="bg-green-500"
          title="Total Revenue"
          value="$42,350"
          badge="+12.5%"
        />
        <StatCard
          icon={<Eye />}
          iconBg="bg-blue-500"
          title="Total Views"
          value="4.5K"
          badge="+18.2%"
        />
        <StatCard
          icon={<Music />}
          iconBg="bg-purple-500"
          title="Joined Campaigns"
          value="12"
          badge="-3"
          negative
        />
        <StatCard
          icon={<TrendingUp />}
          iconBg="bg-red-500"
          title="Growth Rate"
          value="23.4%"
          badge="+5.2%"
        />
      </div>        

    </div>
  )
}

export default AnalyticsStatics


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
    <Card className="rounded-2xl bg-orange-300">
      <CardContent className="px-6 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${iconBg}`}
          >
            {icon}
          </div>

          <Badge
            variant="secondary"
            className={`bg-white ${
              negative ? "text-red-500" : "text-green-600"
            }`}
          >
            {badge}
          </Badge>
        </div>

        <div className="mt-6">
          <p className="text-white/80 text-sm">{title}</p>
          <h2 className="text-3xl font-bold text-white mt-1">{value}</h2>
        </div>
      </CardContent>
    </Card>
  )
}