
import ChatABox from "@/components/ui/website/Messages/ChatABox";
import { myFetch } from "@/utils/myFetch";


export default async function ChatPage({ params }: {
  params: Promise<{
    chatId: string
  }>
}) {

  const { chatId } = await params;

  return (
    <div className="">
      <ChatABox chatId={chatId} />
    </div>

  );
}