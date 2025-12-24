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
import { ChevronDown, Eye, MessageCircleMore, Plus, Star } from "lucide-react"
import Image from "next/image"
import { MdOutlineStar } from "react-icons/md"
import Link from "next/link"
import { myFetch } from "@/utils/myFetch"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { imageUrl } from "@/constants"

const campaigns = Array.from({ length: 6 }).map((_, i) => ({
  campaign: "Summer Vibes 2024",
  profile: "/images/profile21.jpg",
  artist: "Luna Rivers",
  totalFollowers: "25K",
  engagement: "3.5%",
  rating: 5,
  platform: "/tiktok.svg", // replace with your icon
  isFollow: false,
}))

export default function CreatorPopularInfluencer() {


  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoading(true)
        const res = await myFetch("/creators/popular", { tags: ["CREATOR"] });

        if (res?.success) {
          const { data } = res;
          setResponse(data)
          toast.success("followingd Chat Successfully")
          setLoading(false)
        } else {
          toast.success("followingd Chat Successfully")
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchingData()
  }, [])


  const handleCreateChat = async (participant: string) => {
    try {
      const res = await myFetch("/chats/create-chat", { method: "POST", body: { participant } });

      console.log("create chat", res);
      toast.success("Created Chat Successfully")
    } catch (error) {
      console.log(error)
    }
  }

  const handleFollow = async (id: string) => {
    try {
      const res = await myFetch("/followers/follow", { method: "POST", body: { followingId: id }, tags: ['Creators'] });


      console.log("create chat", res);
      if (res?.success) {
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
      const res = await myFetch("/followers/follow", { method: "DELETE", body: { followingId: id }, tags: ['Followings'] });
      console.log("create chat", res);
      if (res?.success) {
        toast.success("Created Chat Successfully")
      } else {
        toast.error(res?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }


  console.log("response", response);
  

  return (
    <>
      {loading ? <div className="flex items-center justify-center">
        <FaSpinner className="animate-spin " size={30} /> </div> :
        response?.following?.length === 0 ? <p className="mb-5 cursor-pointer flex items-center  gap-2">No Data Found</p> :
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
                  {response && response?.data?.map((row: any, i: number) => (
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
                        <Image src="/tiktokBlack.png" alt="platform" width={25} height={25} className="" />
                        <Image src="/instagram.png" alt="platform" width={25} height={25} />
                      </TableCell>
                      <TableCell>{row?.totalFollowers}</TableCell>
                      <TableCell className="text-green-600 font-semibold">
                        {row?.engagement}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold flex gap-.5 text-center">
                        {row?.rating < 1 ? <Star key={i} className="text-orange-500" size={15} /> :
                         Array.from({length: row?.rating+3})?.map((_: any, i: number) => <MdOutlineStar key={i} className="text-orange-500" size={15} />)}      
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
                          <Link href={`/creator/creators/${i + 1}`}><Button variant="outline" size="sm" className="cursor-pointer"><Eye /></Button></Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>


            </CardContent>
          </Card>
      }</>
  )
}
