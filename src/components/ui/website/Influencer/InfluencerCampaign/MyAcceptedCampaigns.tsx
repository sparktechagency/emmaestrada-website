import CampaignCard from '@/components/shared/CampaignCard';
import Link from 'next/link';

const MyAcceptedCampaigns = () => {

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Link href={`/creator/${i}`} key={i}>
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
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MyAcceptedCampaigns