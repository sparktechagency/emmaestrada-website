import CommonHeader from '@/components/shared/CommonHeader'
import React from 'react'
import CampaignHeader from './CampaignHeader';
import Container from '@/components/shared/Container';
import CampaignsList from './CampaignsList';
import FooterBanner from '@/components/shared/FooterBanner';

// const Campaigns = ({campaigns}: {campaigns: }) => {
const Campaigns = () => {
    return (
        <div>
            <CommonHeader title="Campaigns" />
            <Container>
                <CampaignHeader />
                <CampaignsList />
            </Container>
            <FooterBanner />
      <div className="absolute -left-[350px] top-[30%] -z-99 rounded-full bg-[#FFA76A73] blur-3xl top-5 w-[700px] h-[700px]"></div>
        </div>
    )
}

export default Campaigns;