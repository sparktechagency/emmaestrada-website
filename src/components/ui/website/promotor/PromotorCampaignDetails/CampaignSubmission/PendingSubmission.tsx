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
import PlatformSubmissionTabs from "@/components/shared/PlatformSubmissionTabs"


const PendingSubmission = async ({ submissions }: any) => {

  return (
    <div>
      {submissions && (
        <PlatformSubmissionTabs
          submissions={submissions}
          connectedPlatforms={["instagram", "tiktok", "youtube"]}
        />
      )}
    </div>
  )
}


export default PendingSubmission;

