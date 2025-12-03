'use client'
import Modal from '@/components/modals/Modal'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React, { useState } from 'react'

const ProfileImageWithUserData = ({ user }: any) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="">
            <Modal dialogTitle="Profile" open={open} setOpen={setOpen} className='w-[95%]! md:w-3/5! p-4 md:p-8' dialogTrigger={<Image src={user?.profileImage} alt="profile" width={80} height={50} className="h-12 w-12 rounded-full cursor-pointer" />}>
                <div className=" p-6 relative border border-gray-200">
                    {/* Pending Badge */}
                    <Badge className="absolute top-4 right-4 bg-yellow-400 text-white">Pending</Badge>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                            <Image src={user?.profileImage} alt="profile" width={120} height={120} className="h-30 w-30 rounded-full md:mb-4" />
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                                <div>
                                    <h3 className="text-lg font-semibold">Sarah Johnson</h3>
                                    <p className="text-sm text-gray-500">@sarahjmusic</p>
                                </div>
                            </div>

                            <p className="mt-2 text-gray-600">
                                Content creator specializing in music and dance.
                            </p>

                            {/* Tags */}
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {["Pop", "R&B", "Electronic"].map((genre) => (
                                    <Badge key={genre} variant="outline" className="text-gray-700">
                                        {genre}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex flex-col md:flex-row  justify-between">
                            <div className="mt-2">
                                <span className="text-gray-500">Requesting to join : </span>
                                <Badge className="bg-black text-white">Summer Vibes 2024</Badge>
                            </div>
                            {/* Requesting to join */}
                            <div className="mt-2">
                                <span className="text-gray-500">Requesting Date : </span>
                                <span className="bg-black/20 px-2 rounded-md text-sm text-black">June 15, 2024</span>
                            </div>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center bg-secondary/30 p-4 rounded-lg">
                        <div>
                            <p className="text-lg font-semibold">520K</p>
                            <p className="text-gray-500 text-sm">Total Followers</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">6.8%</p>
                            <p className="text-gray-500 text-sm">Avg. Engagement</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">156</p>
                            <p className="text-gray-500 text-sm">Total Videos</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">42</p>
                            <p className="text-gray-500 text-sm">Campaigns Done</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ProfileImageWithUserData