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

import ManagePagination from '@/components/shared/ManagePagination'
import { imageUrl } from '@/constants'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { MdOutlineStar } from 'react-icons/md'
import CreatorListActionBtns from '../InfluencerList/CreatorListActionBtns'
import CreatorDetailsInfoModal from "../../Influencer/Creator/CreatorDetailsInfoModal"



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


const PCreatorsList = async({ creatorData }: { creatorData: any }) => {


      
  return (
    <div className="pb-20">
      {
        creatorData?.data?.length === 0 ? <p className="mb-5 cursor-pointer flex items-center  gap-2">No Data Found</p> :
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
                  {creatorData?.data && creatorData?.data?.map((row: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-3 w-[200px] md:w-full">
                         <CreatorDetailsInfoModal user={row}/>
                          <span>{row?.name ?? row?.followingId?.name}</span>

                        </div>
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
                        {row?.platforms?.length > 0 ? row?.platforms?.map((platform: any) => {
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
                        }) :
                          row?.followingId?.platforms?.length > 0 && row?.followingId?.platforms?.map((platform: any) => {
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
                          })
                        }
                      </TableCell>
                      <TableCell>{row?.totalFollowers ?? row?.followingId?.totalFollowers}</TableCell>
                      <TableCell className="text-green-600 font-semibold">
                        {row?.engagement ?? row?.followingId?.engagement}%
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold flex gap-.5 text-center">

                          {/* ------ Followed Creator Rating -------- */}
                          {row?.rating && row?.rating < 1 ? <Star key={i} className="text-orange-500" size={15} /> :
                            Array.from({ length: row?.rating })?.map((_: any, i: number) => <MdOutlineStar key={i} className="text-orange-500" size={15} />)}

                          {/* ------ Followed Creator Rating -------- */}
                          {row?.followingId && row?.followingId?.rating < 1 ? <Star key={i} className="text-orange-500" size={15} /> :
                            Array.from({ length: row?.followingId?.rating })?.map((_: any, i: number) => <MdOutlineStar key={i} className="text-orange-500" size={15} />)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <CreatorListActionBtns row={row} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>


            </CardContent>
          </Card>
      }

      <ManagePagination meta={creatorData?.meta} />
    </div>)
}


export default PCreatorsList