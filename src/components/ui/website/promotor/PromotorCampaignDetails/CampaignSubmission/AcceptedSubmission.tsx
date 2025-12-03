import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import ProfileImageWithUserData from "./ProfileImageWithUserData"
import ReelsAnalyticsChart from "./ReelsAnalyticsChart"


export default function AcceptedSubmission() {

  const user = {
    name: "Sarah Jhonson",
    profileImage: "/images/profile21.jpg",
  }

  return (
    <div>

      <Card className="bg-transparent shadow-none border-0">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:p-3 ">
          <div className="flex items-center gap-3">
            <ProfileImageWithUserData user={user} />
            <div className="">
              <p className="text-lg font-semibold text-black">Sarah Jhonson</p>
              <p className="text-md text-slate-400">152 days ago by <span className="font-semibold text-primary">Pokiee Ttv</span></p>
            </div>
          </div>
          <div className="flex w-full md:w-auto  items-center md:justify-between gap-3 mt-5 md:mt-0">
            <div className="shring-0! bg-white p-2 rounded-lg flex items-center gap-2 ">
              <Image src="/instagram.png" height={15} width={40} alt="logo" className="h-6 object-contain w-full md:w-7 rounded-md" />
              <Image src="/tiktokBlack.png" height={15} width={40} alt="logo" className="h-6 object-contain w-full md:w-7 rounded-md" />
            </div>
            <Button variant="destructive" className="ml-3">Reject</Button>
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-4">          
            {/* <iframe width="100%" className="min-h-66!" src="https://www.youtube.com/embed/19g66ezsKAg" allowFullScreen /> */}
            <div className="flex justify-center items-center w-full md:w-1/2 h-60 min-h-66">
              <video
                controls
                preload="metadata"
                poster="https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg" // path to your video thumbnail
                className="w-full h-full object-cover rounded-lg"
                aria-label="Video player"
              >
                <source src="/reels.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>            
          </div>

          <div className="w-full md:w-1/2">
            <ReelsAnalyticsChart />
          </div>
        </div>


      </Card>
    </div>
  )
}


