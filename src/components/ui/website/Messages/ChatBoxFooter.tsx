'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { revalidate } from '@/helpers/revalidateHelper';
import { myFetch } from '@/utils/myFetch';
import { Image, Send, X, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

const ChatBoxFooter = () => {
    const [message, setMessage] = useState("")
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [loading, setLoading] = useState(false);

    const params = useParams();
    
    const sendMessage = async () => {
        if (!message.trim() && imageFiles.length === 0) return

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append("text", message)

            imageFiles.forEach((file) => {
                formData.append("images", file)
            })

            const res = await myFetch(`/messages/send-message/${params?.chatId}`, { 
                method: "POST", 
                body: formData 
            })

            console.log("send-message", res);

            if (res?.success) {
                setMessage("")
                setImageFiles([])
                revalidate("chats")
                revalidate("messages")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const removeImage = (index: number) => {
        setImageFiles((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="bg-transparent">
            {/* Image Preview */}
            {imageFiles.length > 0 && (
                <div className="px-4 pb-3 flex gap-3 justify-end overflow-x-auto bg-transparent">
                    {imageFiles.map((file, index) => (
                        <div
                            key={index}
                            className="relative rounded-xl border bg-primary p-2 shadow"
                        >
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow"
                                disabled={loading}
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
                {/* Message Input */}
                <Input
                    className="flex-1"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
                    disabled={loading}
                />

                {/* Image Upload */}
                <label className={`cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        disabled={loading}
                        onChange={(e) => {
                            if (e.target.files) {
                                setImageFiles((prev) => [
                                    ...prev,
                                    // @ts-ignore
                                    ...Array.from(e.target.files),
                                ])
                            }
                        }}
                    />
                    <Image className="text-gray-500 hover:text-gray-700" />
                </label>

                {/* Send Button */}
                <Button
                    disabled={loading || (!message.trim() && imageFiles.length === 0)}
                    onClick={sendMessage}
                    className="rounded-full p-3 bg-orange-500 hover:bg-orange-600 min-w-[44px]"
                >
                    {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <Send size={18} />
                    )}
                </Button>
            </div>
        </div>
    )
}

export default ChatBoxFooter