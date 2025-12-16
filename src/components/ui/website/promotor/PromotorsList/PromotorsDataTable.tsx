import React from 'react'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Plus } from "lucide-react"
import Image from "next/image"

import { MdOutlineStar } from "react-icons/md"
import Link from 'next/link'
import CreatorPagination from '../../Influencer/Creator/CreatorPagination'

const influencers = Array.from({ length: 10 }).map(() => ({
    name: "Ava Storm",
    profile: "/images/profile22.jpg",
    totalFollowers: "45K",
    engagement: "4.1%",
    rating: 4,
    totalCampaigns: 12,
}))


const PromotorsDataTable = () => {
    return (
        <Card className="bg-transparent shadow-none border-0">
            <CardContent className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Promotor</TableHead>
                            <TableHead>Total Followers</TableHead>
                            <TableHead>Engagement</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Num. of Campaign</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {influencers.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={row.profile}
                                            alt="influencer"
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <span>{row.name}</span>
                                    </div>
                                </TableCell>

                                <TableCell>{row.totalFollowers}</TableCell>

                                <TableCell className="text-green-600 font-semibold">
                                    {row.engagement}
                                </TableCell>

                                <TableCell className="flex items-center">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <MdOutlineStar
                                            key={i}
                                            size={15}
                                            className={
                                                i < row.rating
                                                    ? "text-orange-500"
                                                    : "text-gray-300"
                                            }
                                        />
                                    ))}
                                </TableCell>

                                <TableCell>{row.totalCampaigns}</TableCell>

                                <TableCell className="text-right md:w-[50px]">
                                    <div className="flex items-center gap-3">
                                        <Button>
                                            <span>Follow</span>
                                            <Plus />
                                        </Button>

                                        <Link href={`/promotor/promotor-list/${idx + 1}`}><Button
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

                <div className="flex justify-end mt-6 pr-10">
                    <CreatorPagination />
                </div>
            </CardContent>
        </Card>
    )
}

export default PromotorsDataTable