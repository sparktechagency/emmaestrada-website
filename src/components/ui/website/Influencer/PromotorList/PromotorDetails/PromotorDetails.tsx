import Container from '@/components/shared/Container'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { imageUrl } from '@/constants'
import { Star } from 'lucide-react'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlineStar } from 'react-icons/md'
import CreatorPagination from '../../Creator/CreatorPagination'
import PromotorFollowButton from './PromotorFollowButton'

const PromotorDetails = ({ promotor }: any) => {

    const platformData = [
        { title: "Total Followers", color: "text-[#69C9D0]", followers: promotor?.totalFollowers ?? 0, icon: <FaTiktok /> },
        { title: "Engagement", color: "text-[#FF0000]", followers: promotor?.engagement ?? 0, icon: <FaYoutube /> },
        { title: "Total Campaigns", color: "text-[#C13584]", followers: promotor?.totalCampaigns ?? 0, icon: <FaInstagram /> },
    ];

    return (
        <Container>
            <div className=' glassBg px-2 md:px-10 my-10 py-10'>
                <div className="text-center">
                    <img src={`${imageUrl}${promotor?.image}`} className='mx-auto h-28 md:h-44 w-28 md:w-44 rounded-full object-cover' alt='profile' />
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mb-5">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div className="" key={i}>
                            {/* <CampaignCard
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
                                status="pending"
                            /> */}

                        </div>))}
                </div>

                <CreatorPagination />
                <div className="flex items-center justify-end mt-10">
                    <button className="md:self-end btn bg-secondary text-white px-10 py-5 rounded-full shadow-md">Request to become partner</button>
                </div>
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