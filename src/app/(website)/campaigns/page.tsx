import Campaigns from '@/components/ui/website/Campaigns'
import { myFetch } from '@/utils/myFetch'
import React from 'react'

const page = async() => {

  const campaigns = await myFetch("/campaigns");
  console.log("campaigns", campaigns);
  

  return (
    <div>
      <Campaigns />
    </div>
  )
}

export default page