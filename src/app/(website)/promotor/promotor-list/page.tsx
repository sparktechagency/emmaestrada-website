

import CPromotorList from '@/components/ui/website/Influencer/PromotorList/CPromotorList'
import PromotorList from '@/components/ui/website/promotor/PromotorsList'
import { myFetch } from '@/utils/myFetch'
import React from 'react'

const page = async () => {
  const promotorData = await myFetch("//promoters", {tags: ["promotors"]})  

  return <PromotorList promotorData={promotorData?.data}/>
}

export default page