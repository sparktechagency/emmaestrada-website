import Messages from '@/components/ui/website/Influencer/Messages'
import { myFetch } from '@/utils/myFetch'
import React from 'react'

const page = async ({params, searchParams }: {params: Promise<{id: string}>, searchParams: Promise<{chatId: string}>}) => {
  const {id} = await params;
  const {chatId} = await searchParams;

  console.log("searchParams",chatId);
  
  
  const response = await myFetch(`/messages/${chatId}`, {tags: ["messages"]});
  const chatList = await myFetch("/chats", { tags: ["chats"] });

  
  console.log("chatList", chatList);
  
  return (
    // <div><Messages chatList={chatList} response={response}/></div>
    <div><Messages chatList={chatList} response={response?.data}/></div>
  )
}

export default page