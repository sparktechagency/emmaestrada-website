import { Progress } from '@/components/ui/progress'
import { SquareArrowOutUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const platformIcons: Record<string, string> = {
    TikTok: "/tiktokBlack.png",
    Instagram: "/instagram.png",
    YouTube: "/youtube.png",
};


const CampaignData = ({ campaign: data }: any) => {

    return (
        <div className="">
            <div className="mt-6 text-lg font-semibold">Paid Out</div>
            <div className="flex items-end gap-1">
                <span className="text-3xl font-semibold">${data?.remainingAmount}</span>
                <span className="text-slate-400  text-xl font-medium">of <span className='text-primary'>${data?.totalPaidOutAmount}</span> paid out</span>
            </div>
            <Progress value={(data?.totalPaidOutAmount / data?.remainingAmount) * 100} className="h-3 mt-2" />
            <div className="p-5 mt-7 glassBg shadow-lg!">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center  items-start ">
                    <div className="text-start">
                        <p className="text-lg pb-1">Reward</p>
                        <span className="text-sm p-1 rounded bg-blue-700 text-white">${data?.budget?.rewardRate} / {data?.budget?.perViews} views</span>
                    </div>
                    <div className="text-start">
                        <p className="text-lg pb-1">Maximum Payout</p>
                        <p className="font-semibold text-lg text-primary">${data?.budget?.maxPayout}</p>
                    </div>
                    <div className="text-start">
                        <p className="text-lg pb-1">Minimum Payout</p>
                        <p className="font-semibold text-lg text-primary">${data?.budget?.minPayout}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <div className="">
                        <div className="mt-6 text-lg font-semibold">Platforms</div>
                        <div className="flex gap-2  p-2 rounded-lg">
                            {data?.platforms?.map((platform: string) =>
                                platformIcons[platform] ? (
                                    <Image
                                        key={platform}
                                        src={platformIcons[platform]}
                                        height={20}
                                        width={20}
                                        className="h-5 w-5 object-contain"
                                        alt={platform}
                                    />
                                ) : null
                            )}
                        </div>

                    </div>
                </div>
            </div>

            <p className="font-semibold  text-2xl mt-7 mb-6">Track Informatiom</p>
            <div className="p-5  glassBg shadow-lg!  font-semibold flex flex-col gap-5 md:flex-row justify-between">
                <div className="">
                    <p className='text-xl'>Track Title</p>
                    <p className="text-wrap text-gray-500">{data?.trackTitle}</p>
                </div>
                <div className="">
                    <p className='text-xl'>Track Artist</p>
                    <p className="text-wrap text-gray-500">{data?.artistName}</p>
                </div>
            </div>
            <p className="font-semibold  text-2xl mt-7 mb-6">Assets</p>
            <div className="p-5  glassBg shadow-lg!  font-semibold">
                <a href={data?.assets?.availableContentLink} className="text-wrap">{data?.assets?.availableContentLink}</a>
            </div>

            <p className="font-semibold  text-2xl mt-7 mb-6">Audio Link</p>
            <div className="p-5  glassBg shadow-lg!  font-semibold">
                {data?.assets?.tiktokAudioLink && <div className="">
                    <p className='text-gray-500'>Tiktok:</p>
                    <a href={data?.assets?.tiktokAudioLink} className="text-wrap text-blue-500">{data?.assets?.tiktokAudioLink} </a>
                </div>}
                
                 {data?.assets?.instagram_audio_link && <div className="">
                    <p className='text-gray-500'>Instagram:</p>
                    <a href={data?.assets?.instagram_audio_link} className="text-wrap text-blue-500">{data?.assets?.instagram_audio_link} </a>
                </div>}                
            </div>

            <p className="font-semibold  text-2xl mt-7 mb-6">Content Requirements</p>
            <div className="p-5  glassBg shadow-lg! text-gray-500 font-semibold flex items-center gap-5">

                {data?.assets?.contentRequirement && data?.assets?.contentRequirement?.map((item: string) => <span key={item} className="text-xl">{item}</span>)}
            </div>
        </div>
    )
}

export default CampaignData
