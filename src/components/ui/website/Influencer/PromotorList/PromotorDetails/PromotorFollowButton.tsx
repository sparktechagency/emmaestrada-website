'use client';
import { Button } from '@/components/ui/button'
import { revalidate } from '@/helpers/revalidateHelper';
import { myFetch } from '@/utils/myFetch';
import { Plus } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

const PromotorFollowButton = ({promotorId, isFollowing}: {promotorId:string, isFollowing: boolean}) => {

    const handleFollow = async (id: string) => {
        try {
          const res = await myFetch("/followers/follow", { method: "POST", body: { followingId: id } });
          console.log("handleFollow", res);
          if (res?.success) {
            revalidate("single-creator")
            toast.success("Follow  Successfully")
          } else {
            toast.error(res?.message)
          }
        } catch (error) {
          console.log(error)
        }
      }

      const handleUnFollow = async (id: string) => {
        try {
          const res = await myFetch(`/followers/unfollow/${id}`, { method: "DELETE"});          
                console.log("handleUnFollow", res);
                
          if (res?.success) {
            revalidate("single-creator")
            toast.success("Unfollow Successfully")
          } else {
            toast.error(res?.message)
          }
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <>
    {isFollowing ? <Button onClick={()=>handleUnFollow(promotorId)} variant="outline" size="lg" className='min-w-[200px]! text-primary! text-lg border-primary/50 border'>Following</Button> 
    : <Button onClick={()=>handleFollow(promotorId)} size="lg" className='min-w-[200px]! text-lg '>Follow <Plus size={30} /></Button>}
  </>)
}

export default PromotorFollowButton