import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { EllipsisVertical, InfoIcon, Music, Phone, Send, Video } from "lucide-react";


const ChatABox = () => {
  return (
     <div className="flex-1 bg-white flex flex-col rounded-2xl">

        {/* Chat Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
                <AvatarImage src="/images/avatar4.png" />
              <AvatarFallback>OR</AvatarFallback>
            </Avatar>

            <div>
              <h2 className="font-semibold text-lg">Olivia Richards</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Influencer</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-600">            
            <EllipsisVertical size={20}/>
          </div>
        </div>   

        {/* Messages */}
        <ScrollArea className="flex-1 px-6 py-4">

          {/* Incoming */}
          <ChatBubble
            sender="OR"
            message="Hi! I’m excited to be part of your Summer Vibes campaign!"
            time="10:30 AM"
            type="receive"
          />

          {/* Outgoing */}
          <ChatBubble
          sender="OR"
            message="Welcome aboard! Looking forward to your creative take."
            time="10:32 AM"
            type="sent"
          />

          <ChatBubble
            sender="OR"
            message="I have some ideas for a beach-themed video. Thoughts?"
            time="10:35 AM"
            type="receive"
          />

          <ChatBubble          
            message="That sounds perfect! Beach vibes match the song’s energy."
            time="10:40 AM"
            type="sent"
          />

          <ChatBubble
            sender="OR"
            message="Just posted the first video! Check it out 🎵"
            time="11:15 AM"
            type="receive"
            attachment
          />
        </ScrollArea>

        {/* Footer - Message Input */}
        <div className="p-4 border-t flex items-center gap-3">
          <Input className="flex-1" placeholder="Type a message..." />
          <Button className="rounded-full p-3 bg-orange-500 hover:bg-orange-600">
            <Send size={20} />
          </Button>
        </div>
      </div>
  )
}

export default ChatABox

/* Chat Bubble Component */
function ChatBubble({ sender, message, time, type, attachment = false }:any) {
  const isSent = type === "sent";

  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} mb-4`}>
      <div>
        {!isSent && (
          <Avatar className="w-8 h-8 mb-1">
            <AvatarImage src="/images/profile21.jpg" />
            <AvatarFallback>{sender}</AvatarFallback>
          </Avatar>
        )}

        <Card
          className={`w-full p-3 rounded-2xl ${
            isSent ? "bg-orange-500 text-white" : "bg-gray-100"
          }`}
        >
          <p>{message}</p>

          {attachment && (
            <div className="w-24 h-24 mt-2 bg-gray-200 rounded-lg" />
          )}
        </Card>

        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}