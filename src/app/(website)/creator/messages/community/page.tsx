// import ChatArea from "@/components/primaryLayout/messages/chat-interface";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;
  return (
    <section>
      <div className="flex-1 flex flex-col">
        {/* <ChatArea chatId={chatId} isCommunity={true} /> */}
        Chat Area
      </div>
      {/* <ProfileSidebar chatId={chatId} /> */}
    </section>
  );
}
