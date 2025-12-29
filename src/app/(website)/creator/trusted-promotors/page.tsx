import TrustedPromotors from '@/components/ui/website/Influencer/TrustedPromotors/TrustedPromotors'
import { myFetch } from '@/utils/myFetch'
import React from 'react'

const page = async () => {
  const res = await myFetch("/partners/promoter");

  console.log("res", res);
  
  return <TrustedPromotors data={res?.data} />
}

export default page