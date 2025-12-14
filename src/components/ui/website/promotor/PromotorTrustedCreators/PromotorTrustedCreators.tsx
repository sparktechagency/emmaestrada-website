"use client"
import Container from '@/components/shared/Container'
import { Button } from "@/components/ui/button"
import {
    Card,
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

import Image from "next/image"
import { useState } from "react"
import { MdOutlineStar } from "react-icons/md"
import CreatorPagination from '../../Influencer/Creator/CreatorPagination'
import Link from 'next/link'



// Trusted Creator Dummy Data
const trustedCreators = Array.from({ length: 10 }).map(() => ({
    name: "Ethan Blaze",
    profile: "/images/profile21.jpg",
    platform: "/tiktok.svg",
    totalFollowers: "60K",
    engagement: "4.8%",
    rating: 5,
    verified: true,
}))


const PromotorTrustedCreators = () => {
    const [open, setOpen] = useState(false)
    return <Container>
        <div className="mt-10">
            <h1 className={`mb-2 text-3xl font-semibold`}>Trusted Creators</h1>
        </div>

       
            <Card className="bg-transparent shadow-none border-0">
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Trusted Creators</TableHead>
                                <TableHead>Platform</TableHead>
                                <TableHead>Total Followers</TableHead>
                                <TableHead>Engagement</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {trustedCreators.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={row.profile}
                                                alt="creator"
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />

                                            <div className="flex items-center gap-2">
                                                <span>{row.name}</span>
                                                {row.verified && (
                                                    <span className="text-xs bg-green-200 text-green-700 px-2 py-0.5 rounded-full">
                                                        Verified
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="flex items-center gap-2">
                                        <Image
                                            src="/tiktokBlack.png"
                                            alt="platform"
                                            width={22}
                                            height={22}
                                        />
                                        <Image
                                            src="/instagram.png"
                                            alt="platform"
                                            width={22}
                                            height={22}
                                        />
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

                                    <TableCell className="text-right md:w-[50px]">
                                        <div className="flex items-center gap-3">
                                            <Link href={`/promotor/trusted-creators/${idx + 1}`}> <Button
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
        
    </Container>
}

export default PromotorTrustedCreators