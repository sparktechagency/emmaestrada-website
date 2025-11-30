'use client'
import CampaignCard from '@/components/shared/CampaignCard'
import CampaignsDetails from '@/components/shared/CampaignsDetails';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

const MyAcceptedCampaigns = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <Link href={`/influencer/${i}`}><div onClick={()=>setOpen(true)} className="" key={i}>
                            <CampaignCard
                                name="Feel the Vibe"
                                budget="$1000"
                                influencers="25/25"
                                dateRange="01/06/2024 - 30/06/2024"
                                duration="30 days"
                                progress={20}
                                profileImg="/dj.jpg"
                                rightImg="/dj-right.jpg"
                                username="rikodj890"
                                displayName="DJ Nadir"
                                isPrivate={i % 2 !== 0}
                                status="accepted"
                            />
                        </div></Link>
                    ))}
                </div>            
        </div>
    )
}

export default MyAcceptedCampaigns