'use client'
import Modal from '@/components/modals/Modal'
import { FormatDate } from '@/components/shared/FormatDate'


import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { imageUrl } from '@/constants'
import Image from 'next/image'
import React, { useState } from 'react'

const ProfileImageWithUserData = ({ submission }: any) => {
    const [open, setOpen] = useState(false);

      const user = submission?.influencerId;
  const campaign = submission?.campaignId;

    return (
        <div className="">
            <Modal dialogTitle="Profile" open={open} setOpen={setOpen} className='w-[95%]! md:w-3/5! p-4 md:p-8' dialogTrigger={<img src={`${imageUrl}${user?.image}`}  alt="profile" className="h-12 w-12 rounded-full cursor-pointer" />}>
                <div className=" p-6 relative border border-gray-200">
                    {/* Pending Badge */}
                    <Badge className="absolute top-4 right-4 bg-yellow-400 text-white">Pending</Badge>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Profile Image */}
                        <div className="flex-shrink-0 md:mx-0 mx-auto">
                            <Image src={`${user?.image ? imageUrl + user?.image : '/placeholder.png'}`} unoptimized alt="profile" width={120} height={120} className="h-28 md:h-20 w-28 md:w-20 object-cover rounded-md md:rounded-full md:mb-4" />
                            
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex flex-col  md:flex-row items-center md:justify-between gap-1">
                                <div>
                                    <h3 className="text-lg font-semibold">{user?.name}</h3>
                                    <p className="text-sm text-gray-500">@{user?.role}</p>
                                </div>
                            </div>

                            <p className="mt-2 text-gray-600">
                                {user?.bio}
                            </p>

                            {/* Tags */}
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {user?.contentTypes?.map((genre: string) => (
                                    <Badge key={genre} variant="outline" className="text-gray-700">
                                        {genre}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex flex-col md:flex-row  justify-between">
                            <div className="mt-2">
                                <span className="text-gray-500">Requesting to join : </span>
                                <Badge className="bg-black text-white">{campaign?.title}</Badge>
                            </div>
                            {/* Requesting to join */}
                            <div className="mt-2">
                                <span className="text-gray-500">Requesting Date : </span>
                                <span className="bg-black/20 px-2 rounded-md text-sm text-black">{FormatDate(submission?.createdAt ?? submission?.updatedAt)}</span>
                            </div>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-center bg-secondary/30 p-4 rounded-lg">
                        <div>
                            <p className="text-lg font-semibold">{user?.tiktokFollowers  ?? 0}</p>
                            <p className="text-gray-500 text-sm">Tiktok Followers</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">{user?.youtubeFollowers  ?? 0}</p>
                            <p className="text-gray-500 text-sm">YouTube Followers</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">{user?.instagramFollowers  ?? 0}</p>
                            <p className="text-gray-500 text-sm">Instagram Followers</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">{user?.totalCampaigns}</p>
                            <p className="text-gray-500 text-sm">Total Campaign</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ProfileImageWithUserData