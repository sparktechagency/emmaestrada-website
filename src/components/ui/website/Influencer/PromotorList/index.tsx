import Container from '@/components/shared/Container';
import React from 'react'
import CPromotorHeader from './CPromotorHeader';
import CPromotorList from './CPromotorList';
import ManagePagination from '@/components/shared/ManagePagination';

const CreatorPromotorList = ({promotorData}:any) => {

  return (
    <Container>
        <CPromotorHeader />
        <CPromotorList promotorData={promotorData?.data}/>
        <ManagePagination meta={promotorData?.meta}/>
    </Container>
  )
}

export default CreatorPromotorList;