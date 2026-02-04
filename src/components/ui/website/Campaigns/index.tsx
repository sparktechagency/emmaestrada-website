import CommonHeader from '@/components/shared/CommonHeader';
import Container from '@/components/shared/Container';
import FooterBanner from '@/components/shared/FooterBanner';
import CampaignHeader from './CampaignHeader';
import CampaignsList from './CampaignsList';
import ManagePagination from '@/components/shared/ManagePagination';

const Campaigns = async ({ data }: { data: any }) => {
    return (
        <div>
            <CommonHeader title="Campaigns" />
            <Container>
                    <CampaignHeader />
                    <CampaignsList data={data?.data} />
                <div className="mt-10">
                    <ManagePagination meta={data?.meta} />
                </div>
            </Container>
            <FooterBanner />
            <div className="absolute -left-[350px] top-[30%] -z-99 rounded-full bg-[#FFA76A73] blur-3xl top-5 w-[700px] h-[700px]"></div>
        </div>
    )
}

export default Campaigns;