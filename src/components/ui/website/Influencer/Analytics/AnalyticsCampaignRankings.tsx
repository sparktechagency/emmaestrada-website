'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

const campaigns = Array.from({ length: 6 }).map((_, i) => ({
  campaign: "Summer Vibes 2024",
  artist: "Luna Rivers",
  participants: 25,
  views: "25K",
  ranking: 2457,
  earnings: "$700",
  platform: "/tiktok.svg", // replace with your icon
  status: i === 4 ? "completed" : i === 2 ? "upcoming" : "active",
}))

export default function AnalyticsCampaignRankings() {
  return (
    <Card className="bg-orange-50 rounded-2xl">
      <CardHeader>
        <CardTitle>Campaign Rankings</CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaigns</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>My Views</TableHead>
              <TableHead>My Ranking</TableHead>
              <TableHead>Earnings</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {campaigns.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.campaign}</TableCell>
                <TableCell>{row.artist}</TableCell>
                <TableCell>{row.participants}</TableCell>
                <TableCell>{row.views}</TableCell>
                <TableCell className="text-orange-600 font-semibold">
                  {row.ranking}
                </TableCell>
                <TableCell className="text-green-600 font-semibold">
                  {row.earnings}
                </TableCell>
                <TableCell>
                  <Image src="/tiktokBlack.png" alt="platform" width={22} height={22} />
                </TableCell>
                <TableCell className="text-right md:w-[50px] pr-10">
                  <Button                  
                    className={`rounded-full ${
                      row.status === "completed"
                        ? "bg-green-600"
                        : row.status === "upcoming"
                        ? "bg-black"
                        : "bg-red-600"
                    }`}
                  >
                    {row.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end mt-6 pr-10">
          <Button className="bg-orange-500 hover:bg-orange-600 rounded-full gap-2">
            View all <ChevronDown size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
