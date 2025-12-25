import CreatorPromotorList from '@/components/ui/website/Influencer/PromotorList'
import { myFetch } from '@/utils/myFetch'


const page = async() => {

  const promotorData = await myFetch("//promoters", {tags: ["promotors"]})  
  return <CreatorPromotorList promotorData={promotorData?.data}/>
}

export default page