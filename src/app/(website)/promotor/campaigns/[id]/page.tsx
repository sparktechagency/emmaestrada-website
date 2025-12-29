import PromotorCampaignDetails from '@/components/ui/website/promotor/PromotorCampaignDetails';
import { myFetch } from '@/utils/myFetch';
import React from 'react';

type PageProps = {
  searchParams?: {
    status?: string;
    id?: string;
    openTab?: string;
  };
  params?: {
    id?: string;
  };
};

type pageProps = {
  searchParams: Promise<{
    status?: string;
    openTab?: string;
  }>;
   params: {
    id?: string;
  };
}
const page = async ({  
  searchParams,
  params
}: pageProps) => {  
  const {status, openTab} = await searchParams;
  const {id} = await params;

  const res = await myFetch(`/campaigns/get-campaign/${id}`)  
  return (
    <div>
      <PromotorCampaignDetails data={res?.data?.data} status={status} openTab={openTab} />
    </div>
  );
};

export default page;
