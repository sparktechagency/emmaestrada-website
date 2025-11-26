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
    </div>
  )
}

export default FAQS