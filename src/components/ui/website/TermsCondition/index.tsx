import CommonHeader from '@/components/shared/CommonHeader'
import React from 'react'
import TermsContent from './TermsContent'
import Container from '@/components/shared/Container'

const TermsCondition = () => {
  return (
    <div>
        <CommonHeader title='Terms & Condition'/>       
        <Container>
        <TermsContent  />
        </Container>
    </div>
  )
}

export default TermsCondition
