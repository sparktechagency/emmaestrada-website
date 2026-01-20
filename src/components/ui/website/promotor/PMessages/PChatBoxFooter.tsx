"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidate } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";
import { ImageIcon, Send, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

interface PChatBoxFooterProps {
  onMessageSent?: (message: any) => void;
}

const PChatBoxFooter = ({ onMessageSent }: PChatBoxFooterProps) => {
  const params = useParams() as { chatId?: string };

  const [message, setMessage] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() && imageFiles.length === 0) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("text", message);

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      const res = await myFetch(`/messages/send-message/${params?.chatId}`, {
        body: formData,
      });
      if (res?.success) {
        // Clear inputs
        setMessage("");
        setImageFiles([]);

        // Notify parent component
        if (onMessageSent && res?.data?.message) {
          onMessageSent(res.data.message);
        }

        // Revalidate cache
        revalidate("chats");
        revalidate("messages");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="">
      {/* Image Preview */}
      {imageFiles.length > 0 && (
        <div className="px-4 pb-3 flex gap-3 overflow-x-auto">
          {imageFiles.map((file, index) => (
            <div
              key={index}
              className="relative rounded-xl border bg-gray-50 p-2"
            >
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
              >
                <X size={14} />
              </button>

              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="h-24 w-24 rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="p-4 border-t flex items-center gap-3">
        {/* Image Upload */}
        <label className="cursor-pointer">
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setImageFiles((prev) => [
                  ...prev,
                  ...Array.from(e.target.files as FileList),
                ]);
              }
            }}
          />
          <ImageIcon className="text-gray-500 hover:text-gray-700" />
        </label>

        {/* Message Input */}
        <Input
          className="flex-1"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
        />

        {/* Send Button */}
        <Button
          disabled={loading || (!message.trim() && imageFiles.length === 0)}
          onClick={sendMessage}
          className="rounded-full p-3 bg-orange-500 hover:bg-orange-600"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default PChatBoxFooter;