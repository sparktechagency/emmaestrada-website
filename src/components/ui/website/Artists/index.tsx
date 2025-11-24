import CommonHeader from '@/components/shared/CommonHeader'
import React from 'react'
import ArtHeader from './ArtHeader'
import Container from '@/components/shared/Container'

const Artists = () => {
  return (
    <div className="">
      <CommonHeader title="Creators"/>
      <Container>
      <ArtHeader />
      </Container>      
    </div>
  )
}

export default Artists