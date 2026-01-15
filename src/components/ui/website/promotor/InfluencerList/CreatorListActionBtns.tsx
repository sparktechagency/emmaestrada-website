'use client'

import { Button } from '@/components/ui/button';
import { revalidate } from '@/helpers/revalidateHelper';
import { IUser } from '@/types/profile'
import { myFetch } from '@/utils/myFetch';
import { Eye,  MessageCircleMore, Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

const CreatorListActionBtns = ({ row }: { row: any }) => {

  const router = useRouter();
  const searchParams = useSearchParams()

  const type  = searchParams.get("type");
  

     const handleCreateChat = async (participant: string) => {
    try {            
      const res = await myFetch("/chats/create", { method: "POST", body: { participant } });
      console.log("create chat", res);
      if (res?.success) {
        toast.success("Created Chat Successfully")
        revalidate("chats")
        router.push("/creator/messages")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFollow = async (id: string) => {
    try {
      const res = await myFetch("/followers/follow", { method: "POST", body: { followingId: id } });
      console.log("create chat", res);
      if (res?.success) {
        revalidate("CREATOR")
        toast.success("Created Chat Successfully")
      } else {
        toast.error(res?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnFollow = async (id: string) => {
    try {
      const res = await myFetch("/followers/follow", { method: "DELETE", body: { followingId: id } });
      console.log("create chat", res);
      if (res?.success) {
        revalidate("CREATOR")
        toast.success("Created Chat Successfully")
      } else {
        toast.error(res?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const isFollowing = row?.isFollowing || type === "followed";

    return (
        <div className=" flex items-center gap-3">
            {isFollowing ? <Button onClick={() => handleUnFollow(row._id)} variant="outline" className="w-24 border border-primary text-primary bg-transparent"
            >Following
            </Button> :
                <Button onClick={() => handleFollow(row._id)} className="w-24"><span>Follow</span> <Plus /></Button>
            }
            <Button variant="outline" onClick={() => handleCreateChat(row?._id)} size="sm" className="cursor-pointer"><MessageCircleMore /></Button>
            <Link href={`/promotor/creator/${row?._id}`}><Button variant="outline" size="sm" className="cursor-pointer"><Eye /></Button></Link>
        </div>
    )
}

export default CreatorListActionBtns