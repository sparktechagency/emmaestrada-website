import CampaignsDetails from "@/components/shared/CampaignsDetails";
import { myFetch } from "@/utils/myFetch";

type pageProps = {
   params: {
    id?: string;
  };
}
const page = async ({    
  params
}: pageProps) => {    
  const {id} = await params;

  const res = await myFetch(`/campaigns/get-campaign/${id}`)  
  
  return (
    <div>
      <CampaignsDetails data={res?.data?.data}/>
    </div>
  );
};

export default page;
