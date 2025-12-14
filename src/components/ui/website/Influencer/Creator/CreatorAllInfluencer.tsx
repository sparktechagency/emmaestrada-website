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
import { ArrowLeft, ChevronDown, Plus } from "lucide-react"
import Image from "next/image"
import { MdOutlineStar } from "react-icons/md"
import Pagination from "./CreatorPagination"
import CreatorPagination from "./CreatorPagination"
import { useState } from "react"
import ArtistDetails from "./ArtistDetails"
import Link from "next/link"

const campaigns = Array.from({ length: 10 }).map((_, i) => ({
  campaign: "Summer Vibes 2024",
  profile: "/images/profile21.jpg",
  artist: "Luna Rivers",
  totalFollowers: "25K",
  engagement: "3.5%",
  rating: 5,
  totalCampaigns: 7,
  platform: "/tiktok.svg", // replace with your icon
  isFollow: false,
}))

export default function CreatorAllInfluencer() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {open ? <p onClick={() => setOpen(false)} className="mb-5 cursor-pointer flex items-center  gap-2"><ArrowLeft /> Back</p> :
        <Card className="bg-transparent shadow-none border-0">
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Artists</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Total Followers</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {campaigns.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image src={row?.profile} alt="platform" width={40} height={40} className="rounded-full" />
                        <span>{row.artist}</span>

                      </div>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Image src="/tiktokBlack.png" alt="platform" width={22} height={22} className="" />
                      <Image src="/instagram.png" alt="platform" width={22} height={22} />
                    </TableCell>
                    <TableCell>{row.totalFollowers}</TableCell>
                    <TableCell className="text-green-600 font-semibold">
                      {row.engagement}
                    </TableCell>
                    <TableCell className=" font-semibold flex ">
                      {Array.from([1, 2, 3, 4, 5])?.map((_: any, i: number) => <MdOutlineStar className="text-orange-500" size={15} />)}
                    </TableCell>
                    <TableCell className="text-right md:w-[50px]">
                      <div className=" flex items-center gap-3">
                        <Button
                        >
                          <span>Follow</span>
                          <Plus />
                        </Button>
                        <Link href={`/influencer/creators/${i + 1}`}><Button
                          className="border border-black/50 text-black/50 hover:bg-white hover:text-black bg-transparent"
                        >
                          View
                        </Button></Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>


          </CardContent>
        </Card>
      }

      {open && <ArtistDetails />}
    </div>
  )
}


