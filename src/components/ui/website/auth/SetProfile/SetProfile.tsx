'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AiOutlineUpload } from "react-icons/ai"
import { IoCloseOutline } from "react-icons/io5"
import { toast } from 'sonner'

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
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    /* ------------------ Stored Data ------------------ */

    const storedData = localStorage.getItem("registrationData")
    const registrationData = storedData ? JSON.parse(storedData) : null
    const { userName, birthday } = registrationData || {}

    /* ------------------ Utils ------------------ */

    const urlToFile = async (url: string) => {
        const res = await fetch(url)
        const blob = await res.blob()

        return new File([blob], 'avatar.png', {
            type: blob.type,
        })
    }

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
        })


    /* ------------------ Handlers ------------------ */

    const handleFile = (file: File) => {
        if (isUploading) return

        if (!(file instanceof File)) {
            console.error("Not a File:", file);
            return;
        }
        setThumbnail(file)
        setPreviewUrl(URL.createObjectURL(file))
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) handleFile(file)
    }

    const removeImage = () => {
        setThumbnail(null)
        setPreviewUrl(null)
    }

    const selectAvatar = (avatar: string) => {
        setPreviewUrl(avatar)
        setThumbnail(null)
    }

    const handleSubmit = async () => {
        if (!userName) {
            toast.error("First set username")
            router.push("/set-username")
            return
        }

        if (!birthday) {
            toast.error("First set Birthday")
            router.push("/set-birthday")
            return
        }

        try {
            setIsUploading(true)

            let finalFile: File | null = null
            if (thumbnail) {
                finalFile = thumbnail
            }
            // Avatar image
            else if (previewUrl) {
                finalFile = await urlToFile(previewUrl)
            }

            if (!finalFile) {
                toast.error("Please select an image")
                return
            }

            const base64 = await fileToBase64(finalFile)
            localStorage.setItem("image", base64)
            router.push('/set-country')

        } catch (error) {
            toast.error("Upload failed")
        } finally {
            setIsUploading(false)
        }
    }

    /* ------------------ UI ------------------ */

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('/images/bgImg.png')] bg-cover bg-center px-4">
            <div className="backdrop-blur-[2.5px] border-2 border-white/20 rounded-xl p-2 md:p-10">
                <Card className="w-full max-w-lg py-8 px-2">
                    <CardHeader className="text-center space-y-2">
                        <h2 className="text-2xl font-bold">Set your profile</h2>
                        <p className="text-sm text-muted-foreground">
                            Upload a photo or choose one from our gallery
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6 md:min-w-md">

                        {/* Upload Area */}
                        <div>
                            <p className="text-sm font-medium mb-2">Upload new image</p>

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                className="relative mx-auto w-[150px] h-[150px] cursor-pointer flex items-center justify-center rounded-xl border-2"
                            >
                                {previewUrl ? (
                                    <div className="relative w-full h-full p-1">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                removeImage()
                                            }}
                                            className="absolute top-2 right-2 bg-white/70 text-red-600 rounded-sm"
                                        >
                                            <IoCloseOutline size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500">
                                        <div className="bg-white rounded-full shadow w-10 h-10 flex items-center justify-center mx-auto mb-2">
                                            <AiOutlineUpload size={22} />
                                        </div>
                                        <p className="text-sm font-medium">Drag & drop</p>
                                        <p className="text-[10px]">or click to upload</p>
                                    </div>
                                )}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) =>
                                        e.target.files && handleFile(e.target.files[0])
                                    }
                                />
                            </div>
                        </div>

                        {/* Avatar Gallery */}
                        <div>
                            <p className="text-sm font-medium mb-2">Choose from gallery</p>

                            <div className="grid grid-cols-4 gap-3">
                                {avatars.map((avatar) => (
                                    <button
                                        key={avatar}
                                        type="button"
                                        onClick={() => selectAvatar(avatar)}
                                        className={`relative w-16 h-16 rounded-full overflow-hidden border-2
                      ${previewUrl === avatar ? 'border-primary' : 'border-transparent'}`}
                                    >
                                        <Image src={avatar} alt="Avatar" fill />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={removeImage}>
                                Reset
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button
                            size="lg"
                            className="w-full"
                            disabled={!previewUrl || isUploading}
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
