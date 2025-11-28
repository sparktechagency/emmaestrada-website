import PromotorHeader from '@/components/ui/website/promotor/PromotorHeader'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
    <PromotorHeader />
    <main>{children}</main>
    </div>
  )
}

export default layout