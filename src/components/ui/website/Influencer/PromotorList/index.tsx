import Container from '@/components/shared/Container';
import React from 'react'
import CPromotorHeader from './CPromotorHeader';
import CPromotorList from './CPromotorList';
import ManagePagination from '@/components/shared/ManagePagination';


const CreatorPromotorList = ({promotorData}:any) => {

  return (
    <Container>
      <div className="pb-20">
        <CPromotorHeader />
        <CPromotorList promotorData={promotorData?.data}/>
        <ManagePagination meta={promotorData?.meta}/>
        </div>
    </Container>
  )
}

export default CreatorPromotorList;