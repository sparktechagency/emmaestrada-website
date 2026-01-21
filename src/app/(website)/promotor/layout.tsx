import PromotorHeader from '@/components/ui/website/promotor/PromotorHeader'
import getProfile from '@/utils/getProfile'
import React from 'react'

const layout = async({children}: {children: React.ReactNode}) => {
  const profile =  await getProfile()
  
  return (
    <div>
    <PromotorHeader profile={profile}/>
    <main>{children}</main>
    </div>
  )
}

export default layout