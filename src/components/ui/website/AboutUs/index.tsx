import CommonHeader from '@/components/shared/CommonHeader'
import React from 'react'
import Overview from './Overview'
import Container from '@/components/shared/Container'
import OutMission from './OutMission'
import OurVision from './OurVision'
import Statics from '../HomePage/Statics'
import FooterBanner from '@/components/shared/FooterBanner'

const AboutUs = () => {
  return (
    <div>
        <CommonHeader title='About Us'/>
        <Container>
        <Overview />
        <OutMission />
        <Statics />
        <OurVision />        
        </Container>
        <FooterBanner />
    </div>
  )
}

export default AboutUs