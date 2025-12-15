'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import React from 'react'

const CampaignCreateButton = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()


    const handleTabClick = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('status', 'create-campaign')
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }
    return (
        <button  onClick={() => handleTabClick()} className='btn bg-primary -mt-6 text-white flex justify-center gap-1'><Plus /> Create Campaign </button>
    )
}

export default CampaignCreateButton