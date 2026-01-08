import CreatorPromotorList from '@/components/ui/website/Influencer/PromotorList'
import { myFetch } from '@/utils/myFetch'


const page = async({ searchParams }: any) => {
  const params = await searchParams;

  const {  type, ...rest } = params;
  
  
  const queryString = new URLSearchParams(rest).toString();  
  const promotorData = await myFetch(queryString ? `/promoters?${queryString}` : '/promoters', {tags: ["promotors"]})  
  
  return <CreatorPromotorList promotorData={promotorData}/>
}

export default page