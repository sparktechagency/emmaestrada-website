import PromotorCampaignDetails from '@/components/ui/website/promotor/PromotorCampaignDetails'
import React from 'react'


type pageProps = {
  searchParams: Promise<{
    status?: string;
    openTab?: string;
  }>
}
const page = async ({  
  searchParams
}: pageProps) => {  
  const {status, openTab} = await searchParams;

  console.log('openTab', openTab)
  return (
    <div><PromotorCampaignDetails  status={status} openTab={openTab}/></div>
  )
}

export default page