import CommonHeader from '@/components/shared/CommonHeader'
import Container from '@/components/shared/Container'
import React from 'react'
import FAQList from './FAQList'
import FooterBanner from '@/components/shared/FooterBanner'

const FAQS = () => {
  return (
    <div>
        <CommonHeader title='FAQs'/>
        <Container>
            <FAQList />
        </Container>
        <FooterBanner />
        <div className="absolute -left-[350px] -z-99 rounded-full bg-[#FFA76A73]/50 blur-3xl top-[40vh] w-[700px] h-[700px]"></div>
    </div>
  )
}

export default FAQS