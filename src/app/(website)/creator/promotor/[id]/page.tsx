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

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const promotorData = await myFetch(`/promoters/get-single/${id}`, { tags: ['single-promotor'] });

    return (
        <div className="">
            <PromotorDetails promotor={promotorData?.data} />
        </div>
    )
}

export default page