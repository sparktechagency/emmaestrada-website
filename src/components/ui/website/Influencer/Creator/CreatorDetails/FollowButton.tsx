import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const FollowButton = ({creatorId, isFollowing}: {creatorId:string, isFollowing: boolean}) => {
  return (
    <>
    {isFollowing ? <Button variant="outline" size="lg" className='min-w-[200px]! text-primary text-lg border-primary/50 border'>Following</Button> 
    : <Button size="lg" className='min-w-[200px]! text-lg'>Follow <Plus size={30} /></Button>}
  </>)
}

export default FollowButton