import InfluencerProfile from '@/components/ui/website/Influencer/InfluencerProfile'
import getProfile from '@/utils/getProfile';
import React from 'react'

const page = async() => {
    const user = await getProfile();  
  return (
    <div><InfluencerProfile/></div>
  )
}

export default page