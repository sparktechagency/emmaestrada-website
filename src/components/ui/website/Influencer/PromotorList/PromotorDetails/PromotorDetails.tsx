import CampaignCard from '@/components/shared/CampaignCard'
import Container from '@/components/shared/Container'
import ManagePagination from '@/components/shared/ManagePagination'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { imageUrl } from '@/constants'
import { myFetch } from '@/utils/myFetch'
import { Star } from 'lucide-react'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlineStar } from 'react-icons/md'
import RequestToPartnerBtn from './RequestToPartnerBtn'
import { MdOutlineStarPurple500 } from "react-icons/md";

const PromotorDetails = async ({ promotor, searchQuery }: any) => {
    const platformData = [
        { title: "Total Followers", color: "text-[#69C9D0]", followers: promotor?.totalFollowers ?? 0, icon: <FaTiktok /> },
        { title: "Engagement", color: "text-[#FF0000]", followers: promotor?.engagement ?? 0, icon: <FaYoutube /> },
        { title: "Total Campaigns", color: "text-[#C13584]", followers: promotor?.totalCampaigns ?? 0, icon: <FaInstagram /> },
    ];

    const promotorCampaign = await myFetch(searchQuery ? `/campaigns/get-promoter-campaigns/${promotor?._id}?${searchQuery}`
        : `/campaigns/get-promoter-campaigns/${promotor?._id}`);

        const filterCampaigns = promotorCampaign?.data?.filter((cam:any, i:number)=> cam?.status == "active")

    const { data } = await myFetch(`/followers/promoter/${promotor?._id}/partner-cta`);

    const { data: trustedData } = await myFetch(`/partners/check/${promotor?._id}`);

    return (
        <Container>
            <div className=' glassBg px-2 md:px-10 my-10 py-10'>
                <div className="text-center">
                    <div className={`relative rounded-full border-primary/50 ${trustedData?.isPartner ? 'border-2 p-1.5' : 'border-0 p-0'} inline-block`}>
                        <img src={`${imageUrl}${promotor?.image}`} className='mx-auto h-28 md:h-44 w-28 md:w-44 rounded-full object-cover' alt='profile' />
                        {trustedData?.isPartner &&
                            <div className="absolute p-1 border border-primary/80 flex items-center justify-center bottom-3 right-0 md:right-2 bg-white rounded-full">
                                <MdOutlineStarPurple500 className=" text-primary/80 " size={25} /></div>}
                    </div>
                    <h1 className='text-3xl font-semibold mt-5'>{promotor?.name}</h1>
                    <div className="font-semibold flex gap-.5 text-center justify-center my-1">
                        {promotor?.rating === 0 ? <Star className="text-orange-500" size={15} /> :
                            Array.from({ length: promotor?.rating })?.map((_: any, i: number) => <MdOutlineStar key={i} className="text-orange-500" size={15} />)}
                    </div>
                    {promotor?.bio && <p className='text-center text-lg text-slate-500 flex justify-center items-center py-2'><span>{promotor?.bio}</span> </p>}
                    <p className='text-center  flex justify-center items-center'><IoLocationOutline /> {promotor?.location ? <span> {promotor?.location}, {promotor?.country}</span> : "N/A"} </p>

                    <div className="flex items-center gap-5 justify-center my-5">
                        {promotor?.contentTypes?.length > 0 ? promotor?.contentTypes?.map((t: string) => <Badge key={t} className='rounded-full'>{t}</Badge>) : 'N/A'}
                    </div>
                    {/* <PromotorFollowButton promotorId={promotor?._id} isFollowing={promotor?.isFollowing} /> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                    {platformData && platformData?.map((platform: any, i: any) => <PlatformCard key={i} platform={platform} />)}
                </div>
                <h1 className='text-xl font-semibold mt-10 mb-5 text-primary'>Campaigns by {promotor?.name}:</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 md:gap-5 mb-5">
                    {filterCampaigns?.length > 0 ? (
                        filterCampaigns.map((campaign: any, i: number) => (
                            <CampaignCard key={i} campaign={campaign} />
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-3 flex flex-col items-center justify-center py-12 text-center">
                            <p className="text-gray-500 text-lg">
                                Promoter has not added any campaigns yet.
                            </p>
                        </div>
                    )}
                </div>

               {filterCampaigns?.length   > 0  &&  <ManagePagination meta={promotorCampaign?.meta} />}
                {data?.showBecomePartner && !data?.isTrustedPartner && <RequestToPartnerBtn promoterId={promotor?._id} />}
            </div>
        </Container>
    )
}

export default PromotorDetails

const PlatformCard = ({ platform }: any) => {
    const { title, color, icon, followers } = platform;

    return (
        <Card className="rounded-2xl bg-white">
            <CardContent className="px-6 flex flex-col justify-between h-full">
                <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} text-3xl`}>
                        {icon}
                    </div>
                    <p className="text-black text-xl font-medium">{title}</p>
                </div>

                <div className="mt-3">
                    <h2 className={`text-3xl font-bold text-primary mt-1`}>{followers?.toLocaleString()}</h2>
                </div>
            </CardContent>
        </Card>
    );
};