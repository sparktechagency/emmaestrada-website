import TrustedPromotors from '@/components/ui/website/Influencer/TrustedPromotors/TrustedPromotors'
import { myFetch } from '@/utils/myFetch'
import React from 'react'

const page = async () => {
  const TrustedPromotorsData = await myFetch("/partners/promoter");
  
  return <TrustedPromotors data={TrustedPromotorsData} />
}

export default page