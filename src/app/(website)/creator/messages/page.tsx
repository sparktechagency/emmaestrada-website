import Messages from '@/components/ui/website/Influencer/Messages'
import { myFetch } from '@/utils/myFetch'
import React from 'react'

const page = async ({params}: {params: Promise<{id: string}>}) => {

  const {id} = await params;
  
  const response = await myFetch(`/messages/694d28de2c790c489e878187`);
  const chatList = await myFetch("/chats", { tags: ["chats"] });

  return (
    // <div><Messages chatList={chatList} response={response}/></div>
    <div><Messages response={response?.data}/></div>
  )
}

export default page