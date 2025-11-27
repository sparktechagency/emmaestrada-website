'use client'

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
} from "recharts"

const chartData = [
  {
    platform: "TikTok",
    totalViews: 2800000,
    websiteViews: 2100000,
  },
  {
    platform: "Instagram",
    totalViews: 1500000,
    websiteViews: 1450000,
  },
  {
    platform: "YouTube",
    totalViews: 980000,
    websiteViews: 2150000,
  },
]

const tableData = [
  {
    platform: "TikTok",
    totalViews: "2.80M",
    websiteViews: "62.2K",
    engagement: "5.8%",
  },
  {
    platform: "Instagram",
    totalViews: "1.50M",
    websiteViews: "39.5K",
    engagement: "4.2%",
  },
  {
    platform: "YouTube",
    totalViews: "0.98M",
    websiteViews: "54.4K",
    engagement: "4.2%",
  },
]

export default function AnalyticsPlatformStatistics() {
  return (
    <Card className="bg-orange-50 rounded-2xl mb-20">
      <CardHeader>
        <CardTitle>Platform Statistics</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* ================= BAR CHART ================= */}
        <div className="w-full h-[260px] sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={8}>
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="totalViews"
                fill="#181818"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="websiteViews"
                fill="#fb6b2f"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>Total Views</TableHead>
                <TableHead>Website Views (avg.)</TableHead>
                <TableHead className="text-right">
                  Engagements
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.platform}>
                  <TableCell className="font-medium">
                    ● {row.platform}
                  </TableCell>
                  <TableCell>{row.totalViews}</TableCell>
                  <TableCell>{row.websiteViews}</TableCell>
                  <TableCell className="text-right text-orange-600 font-semibold">
                    {row.engagement}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
