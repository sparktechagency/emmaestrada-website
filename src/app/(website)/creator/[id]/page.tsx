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

  const campaign = await myFetch(`/campaigns/get-campaign/${id}`)  

  
  return (
    <div>
      <CampaignsDetails data={campaign?.data}/>
    </div>
  );
};

export default page;
