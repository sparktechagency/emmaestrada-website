'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { myFetch } from '@/utils/myFetch'
import { imageUrl } from '@/constants'
import { Badge } from '@/components/ui/badge'

export default function PAnalyticsCampaignRankings() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCampaignPerformance()
  }, [])

  const fetchCampaignPerformance = async () => {
    try {
      setLoading(true)
      const response = await myFetch('/analytics/campaign-performance')

      console.log("Campaign Performance Response:", response);
      
      if (response?.success) {
        setCampaigns(response?.data)
      } else {
        console.error('Failed to fetch campaign data:', response.message)
      }
    } catch (err: any) {
      console.error('Error fetching campaigns:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: any) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getPlatformIcon = (platform: any) => {
    const icons = {
      instagram: "/instagram.png",
      tiktok: "/tiktokBlack.png",
      youtube: "/youtube.png"
    };
    return icons[platform as keyof typeof icons] || "/default.png";
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Campaign Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Loading campaigns...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='bg-orange-50'>
      <CardHeader>
        <CardTitle>Campaign Rankings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaigns</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>My Views</TableHead>
                <TableHead>Avg Engagement</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No campaign data available
                  </TableCell>
                </TableRow>
              ) : (
                campaigns.map((row: any) => (
                  <TableRow key={row._id}>
                    <TableCell width={200}>
                      <div className="flex items-center gap-3 w-48">
                        <Image
                          src={`${imageUrl + row.campaignThumbnail}`}
                          alt={row.campaignTitle}
                          unoptimized
                          width={40}
                          height={40}
                          className="rounded object-cover"
                        />
                        <span className="font-medium">{row.campaignTitle}</span>
                      </div>
                    </TableCell>
                    <TableCell className=''>{row.brandName}</TableCell>
                    <TableCell>{row.submissions}</TableCell>
                    <TableCell>{formatNumber(row.totalViews)}</TableCell>
                    <TableCell>{row.avgEngagement.toFixed(2)}%</TableCell>
                    <TableCell className="font-semibold">
                      ${row.totalEarned.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {row.platforms.map((platform: any, idx: number) => (
                          <Image
                            key={idx}
                            src={getPlatformIcon(platform)}
                            height={15}
                            width={24}
                            alt={platform}
                            className="h-5 w-6 object-contain"
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`rounded-full ${row.status === "completed" ? "bg-green-600" 
                        : row.status === "upcoming" ? "bg-black" : "bg-red-600"}`}>
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}