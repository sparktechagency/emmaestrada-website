import { Button } from '@/components/ui/button'
import { Gift } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ReviewButtonWithModal from '../../promotor/PromotorCampaignDetails/CampaignSubmission/ReviewButtonWithModal'

const MyCompletedCampaign = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div className="" key={i}>
            <ACampaignCard />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyCompletedCampaign


const ACampaignCard = () => {
  const progress = 20

  return (
    <div className="rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-4  p-5 bg-[#FFF8F3]">

      {/* LEFT CONTENT */}
      <div className="flex flex-col order-2 md:order-1">

        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              <span className="w-2 h-2 bg-white rounded-full" />
              Live
            </span>

            <img src="/lockSign.png" width={20} height={20} alt="lock" />
          </div>


        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 mt-4">
          <Image
            src="https://images.pexels.com/photos/3756767/pexels-photo-3756767.jpeg"
            alt="profile"
            height={100}
            width={100}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">DJ Nadir</h3>
            <p className="text-gray-600 text-sm">@rikodj890</p>
          </div>
        </div>

        <hr className="my-3 border-gray-300" />

        {/* Campaign Info */}
        <div className="space-y-1 text-[16px]">
          <p>
            <span className="font-semibold">Title:</span>{" "}
            <span className="text-orange-500 font-medium">Feel the Vibe</span>
          </p>

          <p>
            <span className="font-semibold">Types:</span>{" "}
            <span className="text-orange-500 font-medium">Pop</span>
          </p>

          <p>
            <span className="font-semibold">Budget:</span>{" "}
            <span className="text-orange-500 font-medium">$1000</span>
          </p>

          <p>
            <span className="font-semibold">Content Type:</span>{" "}
            <span className="text-orange-500 font-medium">UGC</span>
          </p>

          <p className="flex items-center gap-3">
            <span className="font-semibold flex items-center gap-2">
              <Gift size={16} strokeWidth={1} />
              Rewards:
            </span>
            <span className="text-orange-500 font-medium">$0.25 / 1K</span>
          </p>
        </div>

        {/* Progress */}
        <div className="mt-7">
          <p className="text-xs mb-2 text-gray-600 flex justify-between">
            <span className="font-semibold">$700.60 of $8000.00 paid out</span>
            <span>{progress}%</span>
          </p>

          <div className="h-2 rounded-full bg-gray-300">
            <div
              className="h-2 bg-orange-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link href={`/creator/1`} >
          <Button size="lg" className=" w-full bg-blue-600 hover:bg-blue-800 py-3 rounded-lg my-4  font-medium">
            View Campaign
          </Button></Link>

        <ReviewButtonWithModal />
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative order-1 md:order-2">
        <Image
          src="/images/campaign-img.png"
          alt="campaign"
          height={500}
          width={500}
          className="h-[300px] md:h-full w-full object-cover rounded-[12px]"
          draggable={false}
        />

        {/* Status Badge */}
        <div className="flex gap-2 absolute top-3 right-2 bg-white/50 text-white px-3 py-1 rounded-full text-sm">
          <img src="/tiktokBlack.png" width={20} alt="tiktok" />
          <img src="/instagram.png" width={20} alt="instagram" />
          <img src="/youtube.png" width={20} alt="youtube" />
        </div>
      </div>
    </div>
  )
}