import Container from '@/components/shared/Container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { myFetch } from '@/utils/myFetch';
import { Slider } from '@radix-ui/react-slider';
import { CircleCheckBig, Plus, Star } from 'lucide-react';
import Image from 'next/image';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineStar } from 'react-icons/md';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const creatorData = await myFetch(`/creators/get-single/${id}`);

    const { data: creator } = creatorData?.data;
    const platformData = [
        { title: "Total Followers", color: "text-[#69C9D0]", followers: creator?.totalFollowers ?? 0, icon: <FaTiktok /> },
        { title: "Engagement", color: "text-[#FF0000]", followers: creator?.engagement ?? 0, icon: <FaYoutube /> },
        { title: "Total Campaigns", color: "text-[#C13584]", followers: creator?.totalCampaigns ?? 0, icon: <FaInstagram /> },
    ];



    const ProgressBar = ({
        followers,
        maxFollowers = 1000,
        color = "bg-primary",
    }: any) => {

        const getFollowerPercentage = (followers: number | undefined, maxFollowers: number = 1000): number => {
            if (!followers || followers <= 0) return 0;
            return Math.min((followers / maxFollowers) * 100, 100);
        };

        return (
            <div className="h-2 bg-gray-200 rounded-full shadow-md overflow-hidden">
                <div
                    className={`h-full bg-primary transition-all duration-300`}
                    style={{ width: `${getFollowerPercentage(followers, maxFollowers)}%` }}
                />
            </div>
        );
    };

    return (
        <Container>
            <div className=' glassBg px-2 md:px-10 my-10 py-10'>
                <div className="text-center">
                    <Image src="/images/profile21.jpg" height={200} width={200} className='mx-auto rounded-lg' alt='profile' />
                    <h1 className='text-3xl font-semibold mt-5'>{creator?.name}</h1>
                    <p className='text-center text-md flex justify-center items-center'><IoLocationOutline /> {creator?.location ? <span> {creator?.location} {creator?.country}</span> : "N/A"} </p>

                    <div className="font-semibold flex gap-.5 text-center justify-center my-1">
                        {creator.rating < 1 ? <Star className="text-orange-500" size={20} /> :
                            Array.from({ length: creator.rating + 3 })?.map((_: any, i: number) => <MdOutlineStar key={i} className="text-orange-500" size={20} />)}
                    </div>
                    <p className='text-center text-lg text-slate-500 flex justify-center items-center'><span> {creator?.bio ?? "N/A"}</span> </p>
                    {/* <p>Category:</p> */}
                    <div className="flex items-center gap-5 justify-center my-5">
                        {creator?.contentTypes?.length > 0 ? creator?.contentTypes?.map((t: string) => <Badge key={t} className=' rounded-full '>{t}</Badge>) : 'N/A'}
                    </div>
                    {creator?.isFollowing ? <Button variant="outline" size="lg" className='min-w-[200px]! text-lg'>Following</Button> : <Button size="lg" className='min-w-[200px]! text-lg'>Follow <Plus size={30} /></Button>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                    {platformData && platformData?.map((platform: any, i: any) => <PlatformCard key={i} platform={platform} />)}
                </div>

                {/* ----------- Platform Distribution --------- */}

                <div className="bg-white p-5 rounded-lg mt-10">
                    <p className='text-lg  font-semibold'>Platform Distribution</p>
                    {/* Tiktalk */}
                    <div className="flex justify-between text-sm font-medium my-5">
                        <div className="flex items-center gap-2">
                            <Image src="/tiktokBlack.png" height={50} width={50} className='w-5! h-5! rounded-md' alt='logo' />
                            <span>Tiktalk</span> <CircleCheckBig className='text-blue-400' size={20} />
                        </div>
                        <span className="text-gray-700">
                            {creator?.tiktokFollowers} / 1000
                        </span>
                    </div>
                    <ProgressBar followers={creator?.tiktokFollowers}  />

                    {/* Tiktalk */}
                    <div className="flex justify-between text-sm font-medium my-5">
                        <div className="flex items-center gap-2">
                            <Image src="/instagram.png" height={50} width={50} className='w-6 h-6 rounded-md' alt='logo' />
                            <span>Instagram</span> <CircleCheckBig className='text-blue-400' size={20} />
                        </div>
                        <span className="text-gray-700">
                            {creator?.instagramFollowers} / 1000
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <ProgressBar followers={creator?.instagramFollowers}  />

                    {/* Tiktalk */}
                    <div className="flex justify-between text-sm font-medium my-5">
                        <div className="flex items-center gap-2">
                            <Image src="/youtube.png" height={50} width={50} className='w-6 h-6 rounded-md' alt='logo' />
                            <span>Youtube</span>
                        </div>
                        <span className="text-gray-700">
                            {creator?.youtubeFollowers} / 1000
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-200 rounded-full shadow-md overflow-hidden">
                        <ProgressBar followers={creator?.youtubeFollowers}  />
                    </div>
                </div>
                <div className="flex items-center justify-end mt-10">
                    <button className="md:self-end btn bg-secondary text-white px-10 py-5 rounded-full shadow-md">Request to become partner</button>
                </div>
            </div>
        </Container>
    )
}

export default page;

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

const PlatformDistribution = () => {
    return
}