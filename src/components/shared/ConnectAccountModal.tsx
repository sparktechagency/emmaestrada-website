'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { myFetch } from '@/utils/myFetch'
import { Instagram, Music2, Youtube } from 'lucide-react'
import Swal from 'sweetalert2'

const socialPlatforms = [
    {
        id: '1',
        name: 'instagram',
        subtitle: 'Business, Creator, or Personal',
        icon: Instagram,
        color: 'text-pink-600',
        bgColor: 'bg-pink-50',
        link: 'https://api.wesound.app/api/v1/socialIntegrations/instagram/connect',
      
    },
    {
        id: '2',
        name: 'youtube',
        subtitle: 'Channel',
        icon: Youtube,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        link: 'https://api.wesound.app/api/v1/socialIntegrations/youtube/connect',
    },
    {
        id: '3',
        name: 'tiktok',
        subtitle: 'Business or Creator',
        icon: Music2,
        color: 'text-black',
        bgColor: 'bg-gray-50',
        link: 'https://api.wesound.app/api/v1/socialIntegrations/tiktok/connect',
    },
]

type Props = {
    user: any
    open: boolean
    setOpen: (open: boolean) => void
}

export default function ConnectAccountModal({ user, open, setOpen }: Props) {
    const connectedPlatformsSet = new Set(
        (user?.connectedPlatforms || []).map((platform: string) => platform.toLowerCase())
    )

    const isConnected = (platform: string) => {
        const connected = connectedPlatformsSet.has(platform.toLowerCase())        
        return connected
    }

    const handleConnect = (platform: any) => {
        const url = new URL(platform.link)
        url.searchParams.append('userId', user?._id)
        window.location.href = url.toString()
    }

    const handleDisconnect = async (platformName: string) => {
        try {

            const res = await myFetch(`/socialIntegrations/${platformName}/disconnect`, {
                method: 'DELETE'
            })
            if (res?.success) {
                // Success message
                await Swal.fire({
                    title: 'Disconnected!',
                    text: `Your ${platformName} account has been disconnected successfully.`,
                    icon: 'success',
                    confirmButtonColor: '#2563eb',
                    timer: 2000,
                    timerProgressBar: true,
                })
            } else {
                // Error from API
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to disconnect the account. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#2563eb',
                })
            }
        } catch (error) {
            console.error('Disconnect failed', error)

            // Error alert
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonColor: '#2563eb',
            })

        }
    }


    const handleDisconnectClick = async (platformName: string) => {
        setOpen(false)
        const result = await Swal.fire({
            title: 'Are you sure?',
            html: `Do you want to disconnect your <strong>${platformName}</strong> account?<br/>You will need to reconnect it to access your content again.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, disconnect',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-lg',
                title: 'text-xl font-semibold',
                htmlContainer: 'text-sm',
            }
        })

        if (result.isConfirmed) {
            alert("result.isConfirmed");

            await handleDisconnect(platformName)
            Swal.close()

        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="bg-blue-600! ">
                    Connect Account
                </Button>
            </DialogTrigger>

            <DialogContent className="md:max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-semibold">
                        Connect Account
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
                    {socialPlatforms.map((platform) => {
                        const Icon = platform.icon
                        const connected = isConnected(platform.name)

                        return (
                            <button
                                key={platform.id}
                                onClick={() =>
                                    connected
                                        ? handleDisconnectClick(platform.name)
                                        : handleConnect(platform)
                                }
                                className={cn(
                                    'relative flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all',
                                    connected
                                        ? 'border-red-300 bg-red-50 hover:shadow-md'
                                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                )}
                            >
                                {/* STATUS BADGE */}
                                <span
                                    className={cn(
                                        'absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded',
                                        connected
                                            ? 'bg-green-600 text-white'
                                            : 'bg-blue-600 text-white'
                                    )}
                                >
                                    {connected ? 'Connected' : 'Connect'}
                                </span>

                                {/* ICON */}
                                <div
                                    className={cn(
                                        'w-12 h-12 rounded-lg flex items-center justify-center mb-3',
                                        connected ? 'bg-red-100' : platform.bgColor
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            'w-6 h-6',
                                            connected ? 'text-red-600' : platform.color
                                        )}
                                    />
                                </div>

                                {/* NAME */}
                                <h3 className="font-semibold text-base mb-1 capitalize">
                                    {platform.name}
                                </h3>

                                {/* SUBTITLE */}
                                <p className="text-xs text-gray-500 text-center">
                                    {connected
                                        ? 'Click to disconnect'
                                        : platform.subtitle}
                                </p>

                                {/* ACTION */}
                                <Button
                                    className={cn(
                                        'mt-3 w-full text-xs font-medium px-3 py-1 rounded-full',
                                        connected
                                            ? 'bg-red-600 text-white hover:bg-red-700'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    )}
                                >
                                    {connected ? 'Disconnect' : 'Connect'}
                                </Button>
                            </button>
                        )
                    })}
                </div>
            </DialogContent>
        </Dialog>
    )
}