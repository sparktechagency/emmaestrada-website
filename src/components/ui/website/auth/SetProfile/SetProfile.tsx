// app/set-profile/page.tsx
'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AiOutlineUpload } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";


const avatars = [
    '/images/avatar.jpg',
    '/images/avater2.jpg',
    '/images/avatar3.jpg',
    '/images/avatar4.png',
]

export default function SetProfile() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [thumbnailName, setThumbnailName] = useState<string | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    /* ------------------ Handlers ------------------ */

    const handleFile = (file: File) => {
        if (isUploading) return
        setThumbnail(file)
        setThumbnailName(file.name)
        setPreviewUrl(URL.createObjectURL(file))
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) handleFile(file)
    }

    const removeImage = () => {
        setThumbnail(null)
        setThumbnailName(null)
        setPreviewUrl(null)
    }

    const selectAvatar = (avatar: string) => {
        setPreviewUrl(avatar)
        setThumbnail(null)
        setThumbnailName(null)
    }

    const handleSubmit = () => {
        console.log('Final image:', previewUrl || thumbnail)
        router.push('/set-speciality')
    }

    /* ------------------ UI ------------------ */

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('/images/bgImg.png')] bg-cover bg-center px-4">
            <div className=" backdrop-blur-[2.5px] border-2 border-white/20 rounded-xl p-18">
                <Card className="w-full md:min-w-lg max-w-lg py-8 px-2">
                    <CardHeader className="text-center space-y-2">
                        <h2 className="text-2xl font-bold font-sans">Set your profile</h2>
                        <p className="text-md text-muted-foreground">
                            Upload a photo or choose one from our gallery
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Upload Area */}
                        <div>
                            <p className="text-sm font-medium mb-2">Upload new image:</p>

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                className={`relative mx-auto w-[150px] h-[150px] cursor-pointer flex items-center justify-center rounded-xl border-2  text-center transition             
              `}
                            >
                                {previewUrl ? (
                                    <div className="relative w-full h-full  flex flex-col items-center p-1">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full rounded-sm! object-fill"
                                        />

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                removeImage()
                                            }}
                                            className="absolute top-3 right-3 bg-white/50 text-red-600 rounded-sm text-md"
                                        >
                                            <IoCloseOutline  size={20}/>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-gray-500 ">
                                        <div className="bg-white border/70 rounded-full shadow mx-auto flex items-center justify-center w-10 h-10 mb-2">

                                        <AiOutlineUpload size={30}/>
                                        </div>
                                        <p className="text-md font-medium font-sans">Drag & drop</p>
                                        <p className="text-[10px]">or click to upload image</p>
                                    </div>
                                )}

                                {/* Hidden input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                                />
                            </div>
                        </div>

                        {/* Avatar Gallery */}
                        <div>
                            <p className="text-sm font-medium mb-2">
                                Choose from your gallery:
                            </p>

                            <div className="grid grid-cols-4 gap-3">
                                {avatars.map((avatar) => (
                                    <button
                                        key={avatar}
                                        type="button"
                                        onClick={() => selectAvatar(avatar)}
                                        className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition
                    ${previewUrl === avatar ? 'border-primary' : 'border-transparent'}
                  `}
                                    >
                                        <Image src={avatar} alt="Avatar" fill />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={removeImage}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1"
                                disabled={!previewUrl}
                                onClick={handleSubmit}
                            >
                                Save image
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button
                            size="lg"
                            className="w-full"
                            disabled={!previewUrl}
                            onClick={handleSubmit}
                        >
                            Continue
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
