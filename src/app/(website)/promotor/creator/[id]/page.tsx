import CampaignCard from '@/components/shared/CampaignCard';
import Container from '@/components/shared/Container'
import { Button } from '@/components/ui/button';
import ArtistDetailsStatics from '@/components/ui/website/Influencer/Creator/ArtistDetailsStatics';
import CreatorPagination from '@/components/ui/website/Influencer/Creator/CreatorPagination';
import PCreatorDetails from '@/components/ui/website/promotor/PCreator/PCreatorDetails';
import { myFetch } from '@/utils/myFetch';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineStar } from 'react-icons/md';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    
    const creatorData = await myFetch(`/creators/get-single/${id}`, { tags: ['single-creator'] });
    console.log("idididididid", creatorData);
    const { data: creator } = creatorData;

    return (
        <Container>
            <PCreatorDetails creator={creator} />
        </Container>
    )
}

export default page