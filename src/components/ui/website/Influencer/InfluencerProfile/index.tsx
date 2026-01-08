
import Container from '@/components/shared/Container'
import React from 'react'
import ProfileInfo from './ProfileInfo'
import TransactionsData from '../../Transactions'

const InfluencerProfile = () => {
    return (
        <div>
            <Container >
                <div className="my-10">
                    <h1 className={`mb-2 text-3xl font-semibold`}>Profile</h1>
                    <p className="textPara mb-6">Manage your account information and documents</p>
                
                <ProfileInfo />
                <TransactionsData />
                </div>
            </Container>
        </div>
    )
}

export default InfluencerProfile