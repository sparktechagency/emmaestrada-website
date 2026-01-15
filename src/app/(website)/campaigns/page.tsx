import Campaigns from '@/components/ui/website/Campaigns'
import { myFetch } from '@/utils/myFetch'
import React from 'react'

type pageProps = {
  searchParams: Promise<{
    page?: string
  }>
}

const page = async ({ searchParams }: pageProps) => {
  const params = await searchParams;
  
  const queryString = new URLSearchParams(params).toString()
  
  const data = await myFetch(params ? `/campaigns/active-campaigns?${queryString}` : "/campaigns/active-campaigns");
  return (
    <div>
      <Campaigns data={data} />
      {/* <Campaigns  /> */}
    </div>
  )
}

export default page