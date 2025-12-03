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

export default function ReelsAnalyticsChart() {
  return (
    <Card className="bg-orange-50/50 rounded-lg h-full p-2">

      <CardContent className="h-[250px] p-0">
        <ResponsiveContainer width="100%" height="100%" >
          <LineChart data={data}  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
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
