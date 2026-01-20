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
import { ChevronDown, Eye, MessageCircleMore, Plus, Star, X } from "lucide-react"
import Image from "next/image"
import { MdOutlineStar } from "react-icons/md"
import Link from "next/link"
import { myFetch } from "@/utils/myFetch"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { imageUrl } from "@/constants"
import ManagePagination from "@/components/shared/ManagePagination"
import { useRouter } from "next/navigation"
import { revalidate } from "@/helpers/revalidateHelper"

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


export default function CreatorFollowedInfluencer({ followedCreator }: any) {
  const { data: following, meta } = followedCreator?.data;
  const router = useRouter()

  const handleCreateChat = async (participant: string) => {
    try {
      const res = await myFetch("/chats/create", { method: "POST", body: { participant } });      
      if (res?.success) {
        toast.success("Created Chat Successfully")
        router.push("/creator/messages")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnFollow = async (id: string) => {
    try {
      const res = await myFetch("/followers/follow", { method: "DELETE", body: { followingId: id }});      
      if (res?.success) {
        toast.success("Created Chat Successfully")
         revalidate("CREATOR")
      } else {
        toast.error(res?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <div>
    {following?.length === 0 ? <p className="mb-5 cursor-pointer flex items-center  gap-2">No Data Found</p> :
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
              {following?.map((row: any, i: number) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 shrink-0 border-2 relative rounded-full">
                        <AvatarImage
                          src={`${imageUrl}${row?.followingId?.image}` || "/placeholder.png"}
                          alt={row?.userName}
                          className="w-full h-full object-cover rounded-full border-2 border-slate-300"
                        />
                        <AvatarFallback className="bg-orange-500 text-white text-2xl">
                          {row?.followingId?.userName?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{row.followingId?.name}</span>

                    </div>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    {row?.followingId?.platforms?.length > 0 && row?.followingId?.platforms.map((platform: any) => {
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
                  <TableCell>{row?.followingId?.totalFollowers}</TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    {row?.followingId?.engagement}%
                  </TableCell>
                  <TableCell className=" font-semibold flex ">
                    <div className="font-semibold flex gap-.5 text-center">
                      {row?.followingId?.rating < 1 ? <Star key={i} className="text-orange-500" size={15} /> :
                        Array.from({ length: row?.followingId?.rating + 3 })?.map((_: any, i: number) => <MdOutlineStar key={i} className="text-orange-500" size={15} />)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right md:w-[50px]">
                    <div className=" flex items-center gap-3">
                      <Button onClick={() => handleUnFollow(row._id)}><span>Unfollow</span> <X /></Button>
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

    <ManagePagination meta={meta} />
  </div>
  )
}
