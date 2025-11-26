import CommonHeader from '@/components/shared/CommonHeader'
import React from 'react'
import PolicyContent from './PolicyContent'
import Container from '@/components/shared/Container'
import FooterBanner from '@/components/shared/FooterBanner'

const PrivacyPolicy = () => {
  return (
    <div>
      <CommonHeader title="Privacy Policy"/>
      <Container>
      <PolicyContent />
      </Container>
      <FooterBanner />
    </div>
  )
}

export default PrivacyPolicy