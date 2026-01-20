import Container from "@/components/shared/Container"
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

import Link from "next/link"
import { MdOutlineStar } from "react-icons/md"
import CreatorPagination from "../Creator/CreatorPagination"
import { imageUrl } from "@/constants"
import Image from "next/image"
import { Star } from "lucide-react"

const influencers = Array.from({ length: 10 }).map(() => ({
    name: "Ava Storm",
    profile: "/images/profile22.jpg",
    totalFollowers: "45K",
    engagement: "4.1%",
    rating: 4,
    totalCampaigns: 12,
}))

const CPromotorList = async ({ promotorData }: any) => {
    return (
        <Container>
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
                            {promotorData?.length > 0 ? promotorData.map((row: any, idx: number) => (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img src={`${imageUrl + row?.image}`} className="h-10 w-10 object-cover rounded-full" alt={row?.name} />
                                            <span className="capitalize">{row?.name ?? row?.userName }</span>
                                        </div>
                                    </TableCell>

                                    <TableCell>{row?.totalFollowers}</TableCell>

                                    <TableCell className="text-green-600 font-semibold">
                                        {row?.engagement}
                                    </TableCell>

                                    <TableCell >
                                        <div className="font-semibold flex gap-.5 text-center">
                                            {row?.rating < 1 ? <Star className="text-orange-500" size={15} /> :
                                                Array.from({ length: row?.followingId?.rating + 3 })?.map((_: any, i: number) => <MdOutlineStar key={i} className="text-orange-500" size={15} />)}
                                        </div>
                                    </TableCell>

                                    <TableCell>{row?.totalCampaigns}</TableCell>

                                    <TableCell className="text-right md:w-[50px]">
                                        <div className="flex items-center gap-3">
                                            <Link href={`/creator/promotor/${row?._id}`}> <Button
                                                className="border border-black/50 text-black/50 hover:bg-white hover:text-black bg-transparent"
                                            >
                                                View
                                            </Button></Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) :  <TableRow><TableCell colSpan={6}><p className="text-center text-lg textPara">Data not Found</p></TableCell> </TableRow> }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Container>
    )
}


export default CPromotorList;