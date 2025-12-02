import CampaignCard from '@/components/shared/CampaignCard'
import Link from 'next/link'
import React from 'react'

const CampaignsList = () => {
    return (
        <div>
            <div>
                <h1 className="title text-center mb-3">
                    <span className="text-primary">Campaigns</span>  on the Horizon
                </h1>
                <p className="textPara text-center max-w-6xl mx-auto mb-10">
                    Explore our handpicked campaigns that are driving real impact, inspiring communities, and shaping the future. Stay updated with the initiatives that matter most.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-2 gap-y-5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div className="" key={i}>
                        <Link href={`/influencer/${i}`}> <CampaignCard
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
                        /></Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CampaignsList