

import CPromotorList from '@/components/ui/website/Influencer/PromotorList/CPromotorList'
import PromotorList from '@/components/ui/website/promotor/PromotorsList'
import { myFetch } from '@/utils/myFetch'
import React from 'react'

type pageProps  = {
  searchParams?: Promise<{
    page?: string,
  }>
}

const page = async ({searchParams}: pageProps) => {
  const params = await searchParams;

  
  const queryString = new URLSearchParams(params).toString()
  const promotorData = await myFetch(queryString ? `/promoters?${queryString}` : "/promoters", {tags: ["promotors"]})  

  return <PromotorList promotorData={promotorData}/>
}

export default page