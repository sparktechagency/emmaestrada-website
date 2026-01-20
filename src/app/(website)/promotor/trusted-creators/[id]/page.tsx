import CampaignCard from '@/components/shared/CampaignCard';
import Container from '@/components/shared/Container'
import ArtistDetailsStatics from '@/components/ui/website/Influencer/Creator/ArtistDetailsStatics';
import Image from 'next/image';
import React from 'react'
import { MdOutlineStar } from 'react-icons/md';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    
    return (
        <Container>
            <div className=' glassBg px-2 md:px-10 my-10 py-10'>
                <div className="text-center">
                    <Image src="/images/profile21.jpg" height={200} width={200} className='mx-auto' alt='profile' />
                    <h1 className='text-3xl font-semibold mt-5'>Ariana Grande</h1>

                    <div className="flex items-center gap-5 justify-center mt-5">
                        <button className='px-14 py-2 bg-white text-black rounded-full font-semibold text-xl'>POP</button>
                        <button className='px-14 py-2 bg-white text-black rounded-full font-semibold text-xl'>R&B</button>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-5">
                        {Array.from([1, 2, 3, 4, 5])?.map((_: any, i: number) => <MdOutlineStar key={i} className="text-orange-500" size={30} />)}
                    </div>
                    <button className='btn bg-primary text-white px-20 mt-10'>Follow</button>
                </div>
                <ArtistDetailsStatics />
                <h1 className='text-2xl font-semibold mt-10 mb-5'>Campaigns by Ariana Grande</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    {/* <CampaignCard />
                    <CampaignCard /> */}
                </div>            
            </div>
        </Container>
    )
}

export default page