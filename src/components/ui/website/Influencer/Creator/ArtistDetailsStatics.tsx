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
  UsersRound,
} from "lucide-react"


const ArtistDetailsStatics = () => {
  return (
    <div className="my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={<UsersRound />}
          iconBg="bg-green-500"
          title="Followers"
          value="52M"
          badge="+12.5%"
        />
        <StatCard
          icon={<Eye />}
          iconBg="bg-blue-500"
          title="Engagement"
          value="38%"
          badge="+18.2%"
        />
        <StatCard
          icon={<Music />}
          iconBg="bg-purple-500"
          title="Total Campaigns"
          value="12"
          badge="-3"          
        />        
      </div>        
      <p className='textPara mt-3'>Multi-platinum recording artist and actress. Known for powerful vocals and chart-topping hits.</p>

    </div>
  )
}

export default ArtistDetailsStatics


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
    <Card className="rounded-2xl bg-white">
      <CardContent className="px-6 flex flex-col justify-between h-full">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-primary `}
          >
            {icon}
          </div>
            <p className="text-black text-lg">{title}</p>         
        </div>

        <div className="">
          
          <h2 className="text-3xl font-bold text-primary mt-1">{value}</h2>
        </div>
      </CardContent>
    </Card>
  )
}