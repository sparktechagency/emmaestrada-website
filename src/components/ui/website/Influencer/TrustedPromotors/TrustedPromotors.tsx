"use client"

import Container from "@/components/shared/Container"
import ManagePagination from "@/components/shared/ManagePagination"
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
import { imageUrl } from "@/constants"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MdOutlineStar } from "react-icons/md"

export default function TrustedPromotors({ data }: any) {
    return (
        <Container>
            <div className="mt-10">
                <h1 className={`mb-2 text-3xl font-semibold`}>Trusted Promotors</h1>
            </div>

            <Card className="bg-transparent shadow-none border-0">
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Trusted Creators</TableHead>
                                <TableHead>Total Followers</TableHead>
                                <TableHead>Engagement</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Campaign</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data?.data?.length > 0 ? (
                                data?.data?.map((row: any, idx: number) => (
                                    <TableRow key={idx}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <img src={`${imageUrl + row?.promoterId?.image}`} className="h-10 w-10 object-cover rounded-full" alt="Profile" />
                                                <span className="capitalize">{row?.promoterId?.name ?? row?.promoterId?.userName}</span>
                                            </div>
                                        </TableCell>

                                        <TableCell>{row?.promoterId?.totalFollowers}</TableCell>

                                        <TableCell className="text-green-600 font-semibold">{row?.promoterId?.engagement}</TableCell>
                                        <TableCell className="text-green-600 font-semibold">
                                            <div className="font-semibold flex gap-.5 text-center">
                                                {row?.promoterId?.rating === 0 ? <Star className="text-orange-500" size={15} /> :
                                                    Array.from({ length: row?.promoterId?.rating })?.map((_: any, i: number) => <MdOutlineStar key={i} className="text-orange-500" size={15} />)}
                                            </div>
                                        </TableCell>

                                        <TableCell className="flex items-center">
                                            <span>{row?.totalCampaigns ?? 0}</span>
                                        </TableCell>

                                        <TableCell className="text-right md:w-[50px]">
                                            <div className="flex items-center gap-3">
                                                <Link href={`/creator/trusted-creators/${idx + 1}`}>
                                                    <Button className="border border-black/50 text-black/50 hover:bg-white hover:text-black bg-transparent">
                                                        View
                                                    </Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                        No Data Found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <div className="flex justify-end mt-6 pr-10">
                        <ManagePagination meta={data?.meta} />
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}
