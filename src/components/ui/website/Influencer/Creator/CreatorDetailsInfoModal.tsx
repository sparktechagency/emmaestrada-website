'use client'

import Modal from '@/components/modals/Modal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { imageUrl } from '@/constants'
import { myFetch } from '@/utils/myFetch'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface CreatorDetailsInfoModalProps {
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

const CreatorDetailsInfoModal = ({ user }: CreatorDetailsInfoModalProps) => {
  const [open, setOpen] = useState(false)
  const [creatorData, setCreatorData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const creatorId = user?._id || user?.id

  useEffect(() => {
    if (!open || !creatorId) return

    const fetchCreator = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await myFetch(`/creators/get-single/${creatorId}`)
        if (response?.data) {
          setCreatorData(response.data)
        } else {
          setError('No data returned from server')
        }
      } catch (err) {
        console.error('Failed to load creator:', err)
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchCreator()
  }, [open, creatorId])

  // Fallback to the passed user prop if fetch fails or isn't needed
  const displayData = creatorData || user

  const profileImage = displayData?.image
    ? `${imageUrl}${displayData.image}`
    : '/placeholder.png'

  const displayName = displayData?.name || 'Unknown'
  const displayHandle = displayData?.username || displayData?.role || 'creator'

  return (
    <Modal
      dialogTitle="Creator Profile"
      open={open}
      setOpen={setOpen}
      className="w-[95%]! md:w-full! max-w-4xl! p-4 md:p-8"
      dialogTrigger={
        <div className="cursor-pointer shrink-0!">
          <Image
            src={`${imageUrl}${user?.image || '/placeholder.png'}`}
            alt="Profile"
            width={48}
            height={48}
            unoptimized
            className="h-12 w-12 rounded-full object-cover border border-gray-200 shrink-0!"
            onClick={() => setOpen(true)}
          />
        </div>
      }
    >
      <div className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {loading ? (
          <div className="flex min-h-[280px] items-center justify-center py-12">
            <p className="text-gray-500">Loading profile...</p>
          </div>
        ) : error ? (
          <div className="flex min-h-[280px] items-center justify-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <>
            {/* Header - Image + Name */}
            <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-start">              
              <Avatar className="w-20 md:w-14 h-20 md:h-14 border-2">
                <AvatarImage width={160}
                  height={160} src={profileImage} alt={displayName}
                  className="w-full h-full object-cover rounded-full border-2 border-slate-300 shrink-0!"
                />
                <AvatarFallback className="bg-orange-500 text-white text-2xl">
                  {displayName?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar> 

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-semibold">{displayName}</h3>
                <p className="text-sm text-gray-500">@{displayHandle}</p>

                {displayData?.bio && (
                  <p className="mt-3 text-gray-600">{displayData.bio}</p>
                )}

                {/* Content Types / Genres */}
                {displayData?.contentTypes?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {displayData.contentTypes.map((type: string) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-2xl font-bold">{displayData?.tiktokFollowers ?? 0}</p>
                <p className="mt-1 text-sm text-gray-600">TikTok Follower</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-2xl font-bold">{displayData?.youtubeFollowers ?? 0}</p>
                <p className="mt-1 text-sm text-gray-600">YouTube Follower</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-2xl font-bold">{displayData?.instagramFollowers ?? 0}</p>
                <p className="mt-1 text-sm text-gray-600">Instagram Follower</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-2xl font-bold">{displayData?.totalCampaigns ?? 0}</p>
                <p className="mt-1 text-sm text-gray-600">Campaigns</p>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default CreatorDetailsInfoModal