import ChatABox from "@/components/ui/website/Messages/ChatABox";
import { myFetch } from "@/utils/myFetch";


export default async function ChatPage({params}: {params:Promise<{
  chatId: string
}>}) {  

  const {chatId} = await params;
  
  const messages = await myFetch(`/messages/${chatId}`, {tags: ["messages"]})
  const {data} = messages;
  console.log("messages", messages);
  
  return (
    <div className="">
      <ChatABox messages={data?.messages?.reverse()}/>
    </div>

  );
}