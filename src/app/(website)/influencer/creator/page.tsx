import Creator from '@/components/ui/website/Influencer/Creator'
import React from 'react'

type PageProps = {
  searchParams: Promise<{    
    type?: string
  }>
}

const page = async ({searchParams} : PageProps) => {

    const {type} = await searchParams;
  return (
    <div><Creator type={type}/></div>
  )
}

export default page