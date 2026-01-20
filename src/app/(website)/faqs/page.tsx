// import FAQS from '@/components/ui/website/FAQ'
// import { myFetch } from '@/utils/myFetch'
// import React from 'react'

// const page = async() => {

//   const response = await myFetch('/faqs')
//   return (
//     <div>
//         <FAQS />
//     </div>
//   )
// }

// export default page

// app/(website)/faqs/page.tsx
import FAQS from '@/components/ui/website/FAQ'
import { myFetch } from '@/utils/myFetch'
import React from 'react'

const page = async () => {
  const response = await myFetch('/faqs')
  console.log("response", response);
  
  return (
    <div>
      <FAQS faqs={response?.data} />
    </div>
  )
}

export default page
