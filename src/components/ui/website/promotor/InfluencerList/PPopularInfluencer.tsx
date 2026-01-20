
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
import { ArrowLeft, Eye, MessageCircleMore, Plus, Star } from "lucide-react"
import Image from "next/image"
import { MdOutlineStar } from "react-icons/md"
import { useState } from "react"

import Container from "@/components/shared/Container"
import CreatorPagination from "../../Influencer/Creator/CreatorPagination"
import Link from "next/link"
import ManagePagination from "@/components/shared/ManagePagination"
import { myFetch } from "@/utils/myFetch"
import { revalidate } from "@/helpers/revalidateHelper"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { imageUrl } from "@/constants"



const PLATFORM_CONFIG = {
  tiktok: {
    src: '/tiktokBlack.png',
    alt: 'TikTok',
  },
  instagram: {
    src: '/instagram.png',
    alt: 'Instagram',
  },
  youtube: {
    src: '/youtube.png',
    alt: 'YouTube',
  },
  facebook: {
    src: '/facebook.png',
    alt: 'Facebook',
  },
} as const;

const PPopularInfluencer = ({ popularCreator }: any) => {    
     const handleCreateChat = async (participant: string) => {
    try {
      const res = await myFetch("/chats/create", { method: "POST", body: { participant } });      
      if (res?.success) {
        toast.success("Created Chat Successfully")
        // router.push("/creator/messages")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFollow = async (id: string) => {
    try {
      const res = await myFetch("/followers/follow", { method: "POST", body: { followingId: id } });      
      if (res?.success) {
        revalidate("CREATOR")
        toast.success("Created Chat Successfully")
      } else {
        toast.error(res?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnFollow = async (id: string) => {
    try {
      const res = await myFetch("/followers/follow", { method: "DELETE", body: { followingId: id } });      
      if (res?.success) {
        revalidate("CREATOR")
        toast.success("Created Chat Successfully")
      } else {
        toast.error(res?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }


    return(
    <div>
      {
       popularCreator?.data?.length === 0 ? <p className="mb-5 cursor-pointer flex items-center  gap-2">No Data Found</p> :
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
                  {popularCreator?.data?.data && popularCreator?.data?.data?.map((row: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 shrink-0 border-2 relative rounded-full">
                            <AvatarImage
                              src={`${imageUrl}${row?.image}` || "/placeholder.png"}
                              alt={row?.userName}
                              className="w-full h-full object-cover rounded-full border-2 border-slate-300"
                            />
                            <AvatarFallback className="bg-orange-500 text-white text-2xl">
                              {row?.userName?.[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{row.name}</span>

                        </div>
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
                        {row?.platforms?.length > 0 && row?.platforms?.map((platform: any) => {
                          const key = platform.toLowerCase() as any;
                          const config = (PLATFORM_CONFIG as any)[key];

                          if (!config) return null;

                          return (
                            <Image
                              key={key}
                              src={config.src}
                              alt={config.alt}
                              width={25}
                              height={25}
                              loading="lazy"
                            />
                          );
                        })}
                      </TableCell>
                      <TableCell>{row?.totalFollowers}</TableCell>
                      <TableCell className="text-green-600 font-semibold">
                        {row?.engagement}%
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold flex gap-.5 text-center">
                          {row?.rating < 1 ? <Star key={i} className="text-orange-500" size={15} /> :
                            Array.from({ length: row?.rating + 3 })?.map((_: any, i: number) => <MdOutlineStar key={i} className="text-orange-500" size={15} />)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right md:w-[50px]">
                        <div className=" flex items-center gap-3">
                          {row?.isFollowing ? <Button onClick={() => handleUnFollow(row._id)} variant="outline" className="w-24 border border-primary text-primary bg-transparent"
                          >Following
                          </Button> :
                            <Button onClick={() => handleFollow(row._id)} className="w-24"><span>Follow</span> <Plus /></Button>
                          }
                          <Button variant="outline" onClick={() => handleCreateChat(row?._id)} size="sm" className="cursor-pointer"><MessageCircleMore /></Button>
                          <Link href={`/creator/creators/${row?._id}`}><Button variant="outline" size="sm" className="cursor-pointer"><Eye /></Button></Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>


            </CardContent>
          </Card>
      }

      <ManagePagination meta={popularCreator?.data?.data?.meta} />
    </div>
  )
}

export default PPopularInfluencer