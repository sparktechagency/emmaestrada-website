import Container from '@/components/shared/Container';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheckBig, Star, TrendingUp, TvMinimalPlay, Users } from 'lucide-react';
import Image from 'next/image';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineStar } from 'react-icons/md';
import FollowButton from './FollowButton';
import { imageUrl } from '@/constants';

const ProgressBar = ({ percentage }: { percentage: number }) => {
    return (
        <div className="h-2 bg-gray-200 rounded-full shadow-md overflow-hidden">
            <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};

const CreatorDetails = ({ creator }: { creator: any }) => {    
    const platformData = [
        { title: "Total Followers", color: "text-[#69C9D0]", followers: creator?.totalFollowers ?? 0, icon: <Users /> },
        { title: "Engagement", color: "text-[#FF0000]", followers: creator?.engagement ?? 0, icon: <TrendingUp /> },
        { title: "Total Campaigns", color: "text-[#C13584]", followers: creator?.totalCampaigns ?? 0, icon: <TvMinimalPlay /> },
    ];

    // Calculate total followers across all platforms
    const tiktokFollowers = creator?.tiktokFollowers ?? 0;
    const instagramFollowers = creator?.instagramFollowers ?? 0;
    const youtubeFollowers = creator?.youtubeFollowers ?? 0;
    const totalPlatformFollowers = tiktokFollowers + instagramFollowers + youtubeFollowers;

    // Calculate percentages
    const tiktokPercentage = totalPlatformFollowers > 0 ? (tiktokFollowers / totalPlatformFollowers) * 100 : 0;
    const instagramPercentage = totalPlatformFollowers > 0 ? (instagramFollowers / totalPlatformFollowers) * 100 : 0;
    const youtubePercentage = totalPlatformFollowers > 0 ? (youtubeFollowers / totalPlatformFollowers) * 100 : 0;

    return (
        <Container>
            <div className='bg-white shadow-md rounded-xl px-2 md:px-10 my-10 py-10'>
                <div className="text-center">
                    <img src={`${imageUrl}${creator?.image}`} className='mx-auto h-28 md:h-44 w-28 md:w-44 rounded-full object-cover' alt='profile' />
                    <h1 className='text-3xl font-semibold mt-5'>{creator?.name}</h1>
                    <p className='text-center text-md flex justify-center items-center'><IoLocationOutline /> {creator?.location ? <span> {creator?.location} {creator?.country}</span> : "N/A"} </p>

                    <div className="font-semibold flex gap-.5 text-center justify-center my-1">
                        {creator?.rating === 0 ? <Star className="text-orange-500" size={15} /> :
                            Array.from({ length: creator?.rating })?.map((_: any, i: number) => <MdOutlineStar key={i} className="text-orange-500" size={15} />)}
                    </div>
                    <p className='text-center text-lg text-slate-500 flex justify-center items-center'><span> {creator?.bio ?? "N/A"}</span> </p>
                    <div className="flex items-center gap-5 justify-center flex-wrap my-5">
                        {creator?.contentTypes?.length > 0 ? creator?.contentTypes?.map((t: string) => <Badge key={t} className='rounded-full'>{t}</Badge>) : 'N/A'}
                    </div>
                    <FollowButton creatorId={creator?._id} isFollowing={creator?.isFollowing} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                    {platformData && platformData?.map((platform: any, i: any) => <PlatformCard key={i} platform={platform} />)}
                </div>

                {/* ----------- Platform Distribution --------- */}
                <div className="bg-white p-5 rounded-lg mt-10">
                    <p className='text-lg font-semibold'>Platform Distribution</p>
                    
                    {/* TikTok */}
                    <div className="flex justify-between text-sm font-medium my-5">
                        <div className="flex items-center gap-2">
                            <Image src="/tiktokBlack.png" height={50} width={50} className='w-5 h-5 rounded-md' alt='logo' />
                            <span>TikTok</span> <CircleCheckBig className='text-blue-400' size={20} />
                        </div>
                        <span className="text-gray-700">
                            {tiktokFollowers.toLocaleString()} ({tiktokPercentage.toFixed(1)}%)
                        </span>
                    </div>
                    <ProgressBar percentage={tiktokPercentage} />

                    {/* Instagram */}
                    <div className="flex justify-between text-sm font-medium my-5">
                        <div className="flex items-center gap-2">
                            <Image src="/instagram.png" height={50} width={50} className='w-6 h-6 rounded-md' alt='logo' />
                            <span>Instagram</span> <CircleCheckBig className='text-blue-400' size={20} />
                        </div>
                        <span className="text-gray-700">
                            {instagramFollowers.toLocaleString()} ({instagramPercentage.toFixed(1)}%)
                        </span>
                    </div>
                    <ProgressBar percentage={instagramPercentage} />

                    {/* YouTube */}
                    <div className="flex justify-between text-sm font-medium my-5">
                        <div className="flex items-center gap-2">
                            <Image src="/youtube.png" height={50} width={50} className='w-6 h-6 rounded-md' alt='logo' />
                            <span>YouTube</span>
                        </div>
                        <span className="text-gray-700">
                            {youtubeFollowers.toLocaleString()} ({youtubePercentage.toFixed(1)}%)
                        </span>
                    </div>
                    <ProgressBar percentage={youtubePercentage} />
                </div>
            </div>
        </Container>
    );
};

export default CreatorDetails;

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