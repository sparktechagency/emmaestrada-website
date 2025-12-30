import CreatorDetails from '@/components/ui/website/Influencer/Creator/CreatorDetails/CreatorDetails';
import { myFetch } from '@/utils/myFetch';


const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const creatorData = await myFetch(`/creators/get-single/${id}`, {tags: ['single-creator']});
    const { data: creator } = creatorData;    
    return (
        <CreatorDetails creator={creator} />
    )
}

export default page;
