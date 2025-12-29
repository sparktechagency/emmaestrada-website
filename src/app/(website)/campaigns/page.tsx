import Campaigns from '@/components/ui/website/Campaigns'
import { myFetch } from '@/utils/myFetch'
import React from 'react'

const page = async() => {

  const  data  = await myFetch("/campaigns/active-campaigns");  
  
  return (
    <div>
      // <Campaigns data={data?.data} />
      {/* <Campaigns  /> */}
    </div>
  )
}

export default page