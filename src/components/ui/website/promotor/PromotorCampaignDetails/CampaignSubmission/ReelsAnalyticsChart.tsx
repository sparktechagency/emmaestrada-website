'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts"



export default function ReelsAnalyticsChart({views}: {views?: number}) {

  const data = [
  { name: "View", total: views || 0 },
]
  return (
    <Card className="bg-orange-50/50 rounded-lg h-full p-2">
      <CardContent className="h-full p-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar              
              dataKey="total"
              fill="var(--color-secondary)"
              barSize={32}
              width={0.5}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
