import React from 'react'
import PromotorChampaigns from '@/components/ui/website/promotor/PromotorChampaigns'

type pageProps = {
  searchParams: Promise<{
    status?: string
  }>
}
const page = async ({ searchParams }: pageProps) => {
  const params = await searchParams;

  const { status, ...rest} = params;
  const queryString = new URLSearchParams(rest).toString();
  return (
    <div><PromotorChampaigns queryString={queryString} status={status}/></div>
  )
}

export default page