import Campaigns from '@/components/ui/website/Campaigns'
import { myFetch } from '@/utils/myFetch'
import React from 'react'

const page = async() => {

  const { data: campaigns } = await myFetch("/campaigns/active-campaigns");
  console.log("campaigns", campaigns);
  

  return (
    <div>
      {/* <Campaigns campaigns={campaigns?.data} /> */}
      <Campaigns  />
    </div>
  )
}

export default page