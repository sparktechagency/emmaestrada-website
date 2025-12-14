import Container from '@/components/shared/Container';
import React from 'react'
import CPromotorHeader from './CPromotorHeader';
import CPromotorList from './CPromotorList';

const CreatorPromotorList = () => {
  return (
    <Container>
        <CPromotorHeader />
        <CPromotorList />
    </Container>
  )
}

export default CreatorPromotorList;