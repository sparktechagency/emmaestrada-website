import Image from 'next/image'
import React from 'react'
import { MdOutlineStar } from 'react-icons/md'
import ArtistDetailsStatics from './ArtistDetailsStatics'
import CampaignCard from '@/components/shared/CampaignCard'

const ArtistDetails = () => {
    return (
        <div className='pb-20'>
            <div className="text-center">
                <Image src="/images/profile21.jpg" height={200} width={200} className='mx-auto' alt='profile' />
                <h1 className='text-3xl font-semibold mt-5'>Ariana Grande</h1>

                <div className="flex items-center gap-5 justify-center mt-5">
                    <button className='px-14 py-2 bg-white text-black rounded-full font-semibold text-xl'>POP</button>
                    <button className='px-14 py-2 bg-white text-black rounded-full font-semibold text-xl'>R&B</button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-5">
                    {Array.from([1, 2, 3, 4, 5])?.map((_: any, i: number) => <MdOutlineStar className="text-orange-500" size={30} />)}
                </div>
                <button className='btn bg-primary text-white px-20 mt-10'>Follow</button>
            </div>
            <ArtistDetailsStatics />
            <h1 className='text-2xl font-semibold mt-10 mb-5'>Campaigns by Ariana Grande</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* <CampaignCard />
            <CampaignCard /> */}
            </div>            
            <div className="flex items-center justify-end mt-10">
            <button className="md:self-end btn bg-secondary text-white px-10 py-5 rounded-full shadow-md">Request to become partner</button>
            </div>
        </div>
    )
}

export default ArtistDetails