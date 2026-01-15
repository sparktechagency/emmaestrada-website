import CampaignCard from '@/components/shared/CampaignCard';
import Container from '@/components/shared/Container'
import { Button } from '@/components/ui/button';
import ArtistDetailsStatics from '@/components/ui/website/Influencer/Creator/ArtistDetailsStatics';
import CreatorPagination from '@/components/ui/website/Influencer/Creator/CreatorPagination';
import PromotorDetails from '@/components/ui/website/Influencer/PromotorList/PromotorDetails/PromotorDetails';
import { myFetch } from '@/utils/myFetch';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineStar } from 'react-icons/md';

const page = async ({ params, searchParams }: { params: Promise<{ id: string }>, searchParams?: Promise<{page?:string}> }) => {
    const { id } = await params;
        const searchQuery = await searchParams;

    const searchQueryString = new URLSearchParams(searchQuery).toString();

    const promotorData = await myFetch(`/promoters/get-single/${id}`, { tags: ['single-promotor'] });

    return (
        <div className="">
            <PromotorDetails promotor={promotorData?.data} searchQuery={searchQueryString}/>
        </div>
    )
}

export default page