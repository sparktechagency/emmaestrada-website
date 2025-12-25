
import InfluencerList from '@/components/ui/website/promotor/InfluencerList'
import { myFetch } from '@/utils/myFetch'
import React from 'react'
type PageProps = {
  searchParams: Promise<{
    type?: string
  }>
}

const page = async ({ searchParams }: PageProps) => {
  const { type } = await searchParams;

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
    <InfluencerList
      type={type}
      PopularCreator={PopularCreator}
      followedCreator={followedCreator}
      allCreator={allCreator}
    />
  )
}

export default page