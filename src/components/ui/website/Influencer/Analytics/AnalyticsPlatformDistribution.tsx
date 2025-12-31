'use client'

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

const data = [
  { name: "TikTok", value: 52, color: "#111" },
  { name: "Instagram", value: 28, color: "#fb7185" },
  { name: "YouTube", value: 20, color: "#f97316" },
]

export default function AnalyticsPlatformDistribution() {
  return (
    <Card className="bg-orange-50 rounded-2xl h-full">
      <CardHeader>
        <CardTitle>Platform Distribution</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={demoPlatformDistribution}            
              outerRadius={100}
              dataKey="value"
              cx="50%"
              cy="50%"                
              fill="#8884d8"          
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-4 -mt-10! md:-mt-3 text-sm">
          {data.map(d => (
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


const demoPlatformDistribution = [
  { name: "TikTok", value: 52, color: "#111" },
  { name: "Instagram", value: 28, color: "#fb7185" },
  { name: "YouTube", value: 20, color: "#f97316" },
];