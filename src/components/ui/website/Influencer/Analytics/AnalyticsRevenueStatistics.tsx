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
} from "recharts"

const data = [
  { month: "Jan", value: 1000 },
  { month: "Mar", value: 1400 },
  { month: "Jun", value: 2600 },
  { month: "Sep", value: 3400 },
  { month: "Nov", value: 4000 },
  { month: "Dec", value: 4200 },
]

export default function AnalyticsRevenueStatistics() {
  return (
    <Card className="bg-orange-50 rounded-2xl h-full">
      <CardHeader>
        <CardTitle>Revenue Statistics</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ fill: "#111" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
