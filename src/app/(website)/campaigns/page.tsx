import Campaigns from '@/components/ui/website/Campaigns'
import { myFetch } from '@/utils/myFetch'
import React from 'react'

const page = async() => {

  const { data: campaigns } = await myFetch("/campaigns/active-campaigns");

  return (
    <div>
      <Campaigns data={campaigns} />
      {/* <Campaigns  /> */}
    </div>
  )
}

export default page