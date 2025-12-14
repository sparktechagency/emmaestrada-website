
import InfluencerList from '@/components/ui/website/promotor/InfluencerList'
import React from 'react'
type PageProps = {
  searchParams: Promise<{    
    type?: string
  }>
}

const page = async ({searchParams} : PageProps) => {
  const {type} = await searchParams;
return (
    <InfluencerList type={type} />
  )
}

export default page