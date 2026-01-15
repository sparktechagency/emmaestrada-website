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
import ManagePagination from '@/components/shared/ManagePagination'
import { imageUrl } from '@/constants'
import { Star } from 'lucide-react'



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


const PromotorTrustedCreators = ({ data }: any) => {
    const [open, setOpen] = useState(false)

    console.log("datadata", data);

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
                        {data?.data && data?.data?.map((row: any, idx: number) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={`${imageUrl}${row?.creatorId?.image}`}
                                            unoptimized
                                            width={40}
                                            height={40}
                                            alt="creator"
                                            className="rounded-full"
                                        />
                                        <div className="flex items-center gap-2">
                                            <span>{row?.creatorId?.name}</span>
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

                                <TableCell>{row?.creatorId?.totalFollowers}</TableCell>

                                <TableCell className="text-green-600 font-semibold">
                                    {row?.creatorId?.engagement}
                                </TableCell>

                                <TableCell className="flex items-center">
                                    {/* ------ Followed Creator Rating -------- */}
                                    {row?.creatorId?.rating < 1 ? <Star className="text-orange-500" size={15} /> :
                                        Array.from({ length: row?.creatorId?.rating })?.map((_: any, i: number) => <MdOutlineStar key={i} className="text-orange-500" size={15} />)}                                                                 
                                </TableCell>

                                <TableCell className="text-right md:w-[50px]">
                                    <div className="flex items-center gap-3">
                                        <Link href={`/promotor/creator/${ row?.creatorId?._id}`}> <Button
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
                    <ManagePagination meta={data?.meta} />
                </div>
            </CardContent>
        </Card>

    </Container>
}

export default PromotorTrustedCreators