'use client'

import Modal from '@/components/modals/Modal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { imageUrl } from '@/constants'
import { myFetch } from '@/utils/myFetch'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface PromotorInfoModalProps {
    user: {
        _id?: string
        id?: string
        name?: string
        image?: string
        username?: string
        role?: string
        [key: string]: any
    }
}

const PromotorInfoModal = ({ user }: PromotorInfoModalProps) => {
    const [open, setOpen] = useState(false)
    const [promotorData, setPromotorData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const promotorId = user?._id || user?.id

    useEffect(() => {
        if (!open || !promotorId) return

        const fetchPromotor = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await myFetch(`/promoters/get-single/${promotorId}`)
                if (response?.data) {
                    setPromotorData(response.data)
                } else {
                    setError('No data returned from server')
                }
            } catch (err) {
                console.error('Failed to load promoter:', err)
                setError('Failed to load profile')
            } finally {
                setLoading(false)
            }
        }

        fetchPromotor()
    }, [open, promotorId])

    console.log("promotorData", promotorData);
    
    // Fallback to the passed user prop if fetch fails or no extra data needed
    const displayData = promotorData || user

    const profileImage = displayData?.image
        ? `${imageUrl}${displayData.image}`
        : '/placeholder.png'

    const displayName = displayData?.name || 'Unknown'
    const displayHandle = displayData?.username || displayData?.role || 'promoter'

    return (
        <Modal
            dialogTitle="Promoter Profile"
            open={open}
            setOpen={setOpen}
            className="w-[95vw]! md:w-full! max-w-4xl! p-5 md:p-8"
            dialogTrigger={
                <div className="cursor-pointer shrink-0!">
                    <Image
                        src={`${imageUrl}${user?.image || '/placeholder.png'}`}
                        alt="Profile"
                        width={48}
                        height={48}                        
                        className="h-12 w-12 rounded-full object-cover border border-gray-200"
                        onClick={() => setOpen(true)}
                    />
                </div>
            }
        >
            <div className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                {loading ? (
                    <div className="flex min-h-[300px] items-center justify-center py-12">
                        <p className="text-gray-500">Loading promoter profile...</p>
                    </div>
                ) : error ? (
                    <div className="flex min-h-[300px] items-center justify-center py-12">
                        <p className="text-red-600">{error}</p>
                    </div>
                ) : (
                    <>
                        {/* Header - Image + Name + Bio */}
                        <div className="mb-8 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                            <Avatar className="w-14 h-14 border-2">
                                <AvatarImage  width={160}
                                height={160} src={profileImage} alt={displayName}
                                    className="w-full h-full object-cover rounded-full border-2 border-slate-300"
                                />
                                <AvatarFallback className="bg-orange-500 text-white text-2xl">
                                    {displayName?.[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-2xl font-bold tracking-tight">{displayName}</h3>
                                <p className="mt-1 text-base text-gray-600">@{displayHandle}</p>

                                {displayData?.bio && (
                                    <p className="mt-4 text-gray-700 leading-relaxed">{displayData.bio}</p>
                                )}

                                {/* Tags / Categories */}
                                {displayData?.contentTypes?.length > 0 && (
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {displayData.contentTypes.map((type: string) => (
                                            <Badge
                                                key={type}
                                                variant="secondary"
                                                className="px-3 py-1 text-sm"
                                            >
                                                {type}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <Separator className="my-7" />

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                            <div className="rounded-xl bg-gray-50/70 p-5 text-center transition-colors hover:bg-gray-100">
                                <p className="text-3xl font-bold">
                                    {displayData?.tiktokFollowers?.toLocaleString() ?? '0'}
                                </p>
                                <p className="mt-2 text-sm font-medium text-gray-600">TikTok Followers</p>
                            </div>

                            <div className="rounded-xl bg-gray-50/70 p-5 text-center transition-colors hover:bg-gray-100">
                                <p className="text-3xl font-bold">
                                    {displayData?.youtubeFollowers?.toLocaleString() ?? '0'}
                                </p>
                                <p className="mt-2 text-sm font-medium text-gray-600">YouTube Followers</p>
                            </div>

                            <div className="rounded-xl bg-gray-50/70 p-5 text-center transition-colors hover:bg-gray-100">
                                <p className="text-3xl font-bold">
                                    {displayData?.instagramFollowers?.toLocaleString() ?? '0'}
                                </p>
                                <p className="mt-2 text-sm font-medium text-gray-600">Instagram Followers</p>
                            </div>

                            <div className="rounded-xl bg-gray-50/70 p-5 text-center transition-colors hover:bg-gray-100">
                                <p className="text-3xl font-bold">
                                    {displayData?.totalCampaigns ?? '0'}
                                </p>
                                <p className="mt-2 text-sm font-medium text-gray-600">Campaigns</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}

export default PromotorInfoModal