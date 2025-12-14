
"use client"

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
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Image from "next/image"
import { MdOutlineStar } from "react-icons/md"
import { useState } from "react"

import Container from "@/components/shared/Container"
import CreatorPagination from "../../Influencer/Creator/CreatorPagination"
import Link from "next/link"


const influencers = Array.from({ length: 10 }).map(() => ({
    name: "Ava Storm",
    profile: "/images/profile22.jpg",
    platform: "/tiktok.svg",
    totalFollowers: "45K",
    engagement: "4.1%",
    rating: 4,    
}))


const PPopularInfluencer = () => {
    const [open, setOpen] = useState(false)
    return <Container>        
        {open ? (
                    <p
                        onClick={() => setOpen(false)}
                        className="mb-5 cursor-pointer flex items-center gap-2"
                    >
                        <ArrowLeft /> Back
                    </p>
                ) : (
                    <Card className="bg-transparent shadow-none border-0">
                        <CardContent className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Influencers</TableHead>
                                        <TableHead>Platform</TableHead>
                                        <TableHead>Total Followers</TableHead>
                                        <TableHead>Engagement</TableHead>
                                        <TableHead>Rating</TableHead>                                        
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
                                                    <Button>
                                                        <span>Follow</span>
                                                        <Plus />
                                                    </Button>

                                                    <Link href={`/promotor/creator/${idx}`}><Button                                                        
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
                )}

    </Container>
}

export default PPopularInfluencer