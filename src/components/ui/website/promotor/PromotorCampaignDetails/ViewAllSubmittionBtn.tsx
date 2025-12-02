'use client'
import { usePathname, useRouter, useParams, useSearchParams } from 'next/navigation'
import React from 'react'



const ViewAllSubmittionBtn = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const params = useParams<{id?: string}>()
    
    const {id} = params;
    
    const handleOpenSubmittion = () =>{
       router.push(`/promotor/campaigns/${id}?openTab=true`)
    }
    return (
        <div onClick={()=>handleOpenSubmittion()} className="border-2 border-secondary  shadow-md text-primary rounded-xl p-4 mt-4 text-sm text-center cursor-pointer">
            View All Submission
        </div>
    )
}

export default ViewAllSubmittionBtn