import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import ProfileImageWithUserData from "./ProfileImageWithUserData"
import ReelsAnalyticsChart from "./ReelsAnalyticsChart"
import RejectButtonWithForm from "./RejectButtonWithForm"
import PendingDropDown from "./PendingDropDown"
import { myFetch } from "@/utils/myFetch"
import { formatChatTime } from "@/components/shared/FormatChatTime "
import { imageUrl } from "@/constants"


const PendingSubmission = async ({campaignId}: {campaignId: string}) =>{
  const res = await  myFetch(`/submissions/campaign-submissions/${campaignId}`);

  console.log("PendingSubmission11", res?.data?.data);
  const user = {
    name: "Sarah Jhonson",
    profileImage: "/images/profile21.jpg",
  }

  return (
    <div>

      {res?.data?.data &&  res?.data?.data.map((submission: any, i: number) => <Card key={i} className="bg-transparent shadow-none border-0 ">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:p-3 ">
          <div className="flex items-center gap-3">
            <ProfileImageWithUserData submission={submission} />
            <div className="">
              <p className="text-lg font-semibold text-black">{submission?.influencerId?.name}</p>
              <p className="text-md text-slate-400"> {formatChatTime(submission?.createdAt)} ago by <span className="font-semibold text-primary">Pokiee Ttv</span></p>
            </div>
          </div>
          <div className="flex w-full md:w-auto  items-center justify-end md:justify-between gap-3 mt-5 md:mt-0">
            <div className="shring-0! bg-white p-2 rounded-lg flex items-center gap-2 ">
              <Image src="/instagram.png" height={15} width={40} alt="logo" className="h-6 object-contain w-full md:w-7 rounded-md" />
              <Image src="/tiktokBlack.png" height={15} width={40} alt="logo" className="h-6 object-contain w-full md:w-7 rounded-md" />
            </div>
            <div className="">              
              <PendingDropDown submission={submission} />
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-4">
          <div className="flex justify-center items-center w-full md:w-1/2 h-60 min-h-66">
             <video
              controls
              preload="metadata"              
              className="w-full h-full object-cover rounded-lg"
              aria-label="Video player"
              src={`${imageUrl}${submission?.video}`}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="w-full md:w-1/2">
            <ReelsAnalyticsChart views={submission?.metrics?.views}/>
          </div>
        </div>


      </Card>)}
    </div>
  )
}


export default PendingSubmission;