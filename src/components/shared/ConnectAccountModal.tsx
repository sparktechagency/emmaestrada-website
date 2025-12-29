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
import {
    Instagram,
    Music2,
    Youtube
} from 'lucide-react'

const socialPlatforms = [
    {
        id: 'instagram',
        name: 'Instagram',
        subtitle: 'Business, Creator, or Personal',
        icon: Instagram,
        color: 'text-pink-600',
        bgColor: 'bg-pink-50',
        link: "https://rakibur5000.binarybards.online/api/v1/socialIntegrations/instagram/connect"
    },

    {
        id: 'youtube',
        name: 'YouTube',
        subtitle: 'Channel',
        icon: Youtube,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        link: "https://rakibur5000.binarybards.online/api/v1/socialIntegrations/youtube/connect"
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        subtitle: 'Business or Creator',
        icon: Music2,
        color: 'text-black',
        bgColor: 'bg-gray-50',
        link: "https://rakibur5000.binarybards.online/api/v1/socialIntegrations/tiktok/connect"
    }
]

export default function ConnectAccountModal({ userId, open, setOpen }: any) {
    const handleConnect = (platform: any) => {
        const url = new URL(platform.link);
        url.searchParams.append("userId", encodeURIComponent(userId));

        window.location.href = url.toString();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex justify-end">
                    <Button className='bg-blue-600!' size="lg">Connect Account</Button>
                </div>
            </DialogTrigger>
            <DialogContent className="md:max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-semibold">
                        Connect Account
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
                    {socialPlatforms.map((platform: any) => {
                        const Icon = platform.icon
                        return (
                            <button
                                key={platform.id}
                                onClick={() => handleConnect(platform)}
                                className={cn(
                                    'relative flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all hover:shadow-md',
                                    'border-gray-200 hover:border-gray-300'
                                )}
                            >
                                {platform.badge && (
                                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        {platform.badge}
                                    </span>
                                )}
                                <div
                                    className={cn(
                                        'w-12 h-12 rounded-lg flex items-center justify-center mb-3',
                                        platform.bgColor
                                    )}
                                >
                                    <Icon className={cn('w-6 h-6', platform.color)} />
                                </div>
                                <h3 className="font-semibold text-base mb-1">
                                    {platform.name}
                                </h3>
                                <p className="text-xs text-gray-500 text-center">
                                    {platform.subtitle}
                                </p>
                            </button>
                        )
                    })}
                </div>
            </DialogContent>
        </Dialog>
    )
}