
import Container from '@/components/shared/Container'
import React from 'react'
import ProfileInfo from './ProfileInfo'
import TransactionsData from '../../Transactions'
import getProfile from '@/utils/getProfile'

const InfluencerProfile = async() => {
    const profile = await getProfile();  
    return (
        <div>
            <Container >
                <div className="my-10">
                    <h1 className={`mb-2 text-3xl font-semibold`}>Profile</h1>
                    <p className="textPara mb-6">Manage your account information and documents</p>
                
                <ProfileInfo profile={profile}/>
                <TransactionsData />
                </div>
            </Container>
        </div>
    )
}

export default InfluencerProfile