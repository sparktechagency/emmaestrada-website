import Creator from '@/components/ui/website/Influencer/Creator'
import { myFetch } from '@/utils/myFetch'
import React from 'react'

type PageProps = {
  searchParams: Promise<{    
    type?: string
  }>
}

const page = async ({searchParams} : PageProps) => {
  const {type} = await searchParams;

const [
    PopularCreator,
    followedCreator,
    allCreator
  ] = await Promise.all([
    myFetch("/creators/popular", { tags: ["CREATOR"] }),
    myFetch("/followers/following", { tags: ["CREATOR"] }),
    myFetch("/creators", { tags: ["CREATOR"] }),
  ])

  return (
    <div><Creator type={type} PopularCreator={PopularCreator}
        followedCreator={followedCreator}
        allCreator={allCreator}/></div>
  )
}

export default page