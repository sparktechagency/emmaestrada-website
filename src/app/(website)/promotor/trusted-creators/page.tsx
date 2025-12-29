import PromotorTrustedCreators from '@/components/ui/website/promotor/PromotorTrustedCreators/PromotorTrustedCreators'
import { myFetch } from '@/utils/myFetch';
import React from 'react'

const page = async() => {
    const res = await myFetch("/partners/promoter");
  
    console.log("res", res);
  return <PromotorTrustedCreators />
}

export default page