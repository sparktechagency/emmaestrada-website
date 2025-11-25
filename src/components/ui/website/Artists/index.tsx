import CommonHeader from '@/components/shared/CommonHeader'
import React from 'react'
import ArtHeader from './ArtHeader'
import Container from '@/components/shared/Container'
import ArtistList from './ArtistList'
import FooterBanner from '@/components/shared/FooterBanner'

const Artists = () => {
  return (
    <div className="">
      <CommonHeader title="Creators"/>
      <Container>
      <ArtHeader />
      <ArtistList />
      </Container>      
      <FooterBanner />
      <div className="absolute -left-[350px] top-[30%] -z-99 rounded-full bg-[#FFA76A73] blur-3xl top-5 w-[700px] h-[700px]"></div>
    </div>
  )
}

export default Artists