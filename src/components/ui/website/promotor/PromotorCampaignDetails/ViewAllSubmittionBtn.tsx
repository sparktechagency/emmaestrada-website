// 'use client'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import React from 'react'



// const ViewAllSubmittionBtn = ({}) => {
//     const router = useRouter();
//     const pathname = usePathname();
//     const searchParams = useSearchParams()


//     const handleOpenSubmittion = (value: string) =>{
//         const params = new URLSearchParams(searchParams.toString());
//         params.set(value)
//     }
//     return (
//         <div onClick={()=>handleOpenSubmittion(`openTab=true`)} className="bg-secondary  shadow-md text-white rounded-xl p-4 mt-4 text-sm text-center">
//             View All Submission
//         </div>
//     )
// }

// export default ViewAllSubmittionBtn