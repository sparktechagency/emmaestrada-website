
import ChatABox from "@/components/ui/website/Messages/ChatABox";
import getProfile from "@/utils/getProfile";
import { myFetch } from "@/utils/myFetch";


export default async function ChatPage({ params }: {
  params: Promise<{
    chatId: string
  }>
}) {

  const { chatId } = await params;
  const profile = await getProfile()
  return (
    <div className="">
      <ChatABox chatId={chatId} profile={profile}/>
    </div>

  );
}