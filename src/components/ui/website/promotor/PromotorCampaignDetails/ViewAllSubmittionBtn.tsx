'use client'
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter, useParams, useSearchParams } from 'next/navigation'
import React from 'react'



const ViewAllSubmittionBtn = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const params = useParams<{id?: string}>()
    
    const {id} = params;
    const openTab = searchParams.get('openTab')
    
    const handleOpenSubmittion = () =>{
       router.push(`/promotor/campaigns/${id}?openTab=true`)
    }
    const handleBack = ()=>{
         router.push(`/promotor/campaigns/${id}`)
    }
    return (
        <div className="">
        {!openTab ? <div onClick={()=>handleOpenSubmittion()} className="border-2 border-secondary  shadow-md text-primary rounded-xl p-4 mt-4 text-sm text-center cursor-pointer">
            View All Submission {openTab} 
        </div> : 
        <Button onClick={()=>handleBack()} variant="link" className='text-black'> <ArrowLeft size={20}/> <span>Back</span> </Button>}
        </div>
    )
}

export default ViewAllSubmittionBtn