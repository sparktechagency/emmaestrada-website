import CampaignCard from '@/components/shared/CampaignCard';
import Container from '@/components/shared/Container'
import { Button } from '@/components/ui/button';
import ArtistDetailsStatics from '@/components/ui/website/Influencer/Creator/ArtistDetailsStatics';
import CreatorPagination from '@/components/ui/website/Influencer/Creator/CreatorPagination';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineStar } from 'react-icons/md';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    console.log("params", id);

    return (
        <Container>
            <div className=' glassBg px-2 md:px-10 my-10 py-10'>
                <div className="text-center">
                    <Image src="/images/profile21.jpg" height={200} width={200} className='mx-auto rounded-lg' alt='profile' />
                    <h1 className='text-3xl font-semibold mt-5'>Ariana Grande</h1>
                    <p className='text-center textPara flex justify-center items-center'><IoLocationOutline /> <span> California, USA</span> </p>

                    <div className="flex items-center justify-center gap-2 my-3">
                        {Array.from([1, 2, 3, 4, 5])?.map((_: any, i: number) => <MdOutlineStar className="text-orange-500" size={30} />)}
                    </div>
                    <p className='text-center text-lg text-slate-500 flex justify-center items-center'><span> Professional dancer and content creator specalized.</span> </p>
                    <div className="flex items-center gap-5 justify-center my-5">
                        <button className='px-14 py-2 bg-white text-black rounded-full font-semibold text-xl'>POP</button>
                        <button className='px-14 py-2 bg-white text-black rounded-full font-semibold text-xl'>R&B</button>
                    </div>
                    <Button size="lg" className='min-w-[200px]! text-lg'>Follow <Plus size={30} /></Button>
                </div>
                <ArtistDetailsStatics />
                <h1 className='text-xl font-semibold mt-10 mb-5 text-primary'>Campaigns by Ariana Grande:</h1>

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
                            514451
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

export default page