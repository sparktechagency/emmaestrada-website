import { Card } from "@/components/ui/card"
import Image from "next/image"
import AcceptedDropDown from "./AcceptedDropDown"
import ProfileImageWithUserData from "./ProfileImageWithUserData"
import ReelsAnalyticsChart from "./ReelsAnalyticsChart"
import PlatformSubmissionTabs from "@/components/shared/PlatformSubmissionTabs"


export default function AcceptedSubmission({ submissions }: any) {

  const user = {
    name: "Sarah Jhonson",
    profileImage: "/images/profile21.jpg",
  }

  return (
    <div>
      <div>
        {submissions && (
          <PlatformSubmissionTabs
            submissions={submissions}
            connectedPlatforms={["instagram", "tiktok", "youtube"]}
          />
        )}
      </div>
    </div >
  )
}


