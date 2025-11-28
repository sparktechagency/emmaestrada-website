import React from 'react'
import PromotorChampaigns from '@/components/ui/website/promotor/PromotorChampaigns'

type pageProps = {
  searchParams: Promise<{
    status?: string
  }>
}
const page = async ({ searchParams }: pageProps) => {
  const {status} = await searchParams;
  return (
    <div><PromotorChampaigns status={status}/></div>
  )
}

export default page