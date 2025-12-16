import CampaignCard from '@/components/shared/CampaignCard';
import Container from '@/components/shared/Container'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ArtistDetailsStatics from '@/components/ui/website/Influencer/Creator/ArtistDetailsStatics';
import { LocateIcon, MapPin, Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineStar } from 'react-icons/md';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    console.log("params", id);

    const platformData = [
        { title: "TikTok Followers", color: "text-[#69C9D0]", followers: 12500, icon: <FaTiktok /> },
        { title: "YouTube Subscribers", color: "text-[#FF0000]", followers: 32000, icon: <FaYoutube /> },
         { title: "Instagram Followers", color: "text-[#C13584]", followers: 54000, icon: <FaInstagram /> },
    ];
    return (
        <Container>
            <div className=' glassBg px-2 md:px-10 my-10 py-10'>
                <div className="text-center">
                    <Image src="/images/profile21.jpg" height={200} width={200} className='mx-auto rounded-lg' alt='profile' />
                    <h1 className='text-3xl font-semibold mt-5'>Ariana Grande</h1>
                    <p className='text-center textPara flex justify-center items-center'><IoLocationOutline /> <span> California, USA</span> </p> 

                    <div className="flex items-center gap-5 justify-center mt-5">
                        <button className='px-14 py-2 bg-white text-black rounded-full font-semibold text-xl'>POP</button>
                        <button className='px-14 py-2 bg-white text-black rounded-full font-semibold text-xl'>R&B</button>
                    </div>

                    <div className="flex items-center justify-center gap-2 my-5">
                        {Array.from([1, 2, 3, 4, 5])?.map((_: any, i: number) => <MdOutlineStar className="text-orange-500" size={30} />)}
                    </div>
                    <Button size="lg" className='min-w-[200px]! text-lg'>Follow <Plus size={30}/></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                    {platformData && platformData?.map((platform:any, i:any)=><PlatformCard platform={platform} />)}                   
                </div>
                <div className="flex items-center justify-end mt-10">
                    <button className="md:self-end btn bg-secondary text-white px-10 py-5 rounded-full shadow-md">Request to become partner</button>
                </div>
            </div>
        </Container>
    )
}

export default page;

const PlatformCard = ({ platform}:any) => {
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