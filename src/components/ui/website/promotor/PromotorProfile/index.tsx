import Container from '@/components/shared/Container'
import React from 'react'
import ProfileInfo from '../../Influencer/InfluencerProfile/ProfileInfo'
import TransactionsData from '../../Transactions'
import getProfile from '@/utils/getProfile'

const PromotorProfile =  async() => {
    const profile = await getProfile();  
    return (
        <div className='pb-10'>
            <Container >
                <div className="my-10">
                    <h1 className={`mb-2 text-3xl font-semibold`}>Profile</h1>
                    <p className="textPara">Manage your account information and documents</p>
                </div>
                <ProfileInfo profile={profile}/>
                <TransactionsData />
            </Container>
        </div>
    )
}

export default PromotorProfile