
import Container from '@/components/shared/Container'
import React from 'react'
import ProfileInfo from './ProfileInfo'

const InfluencerProfile = () => {
    return (
        <div>
            <Container >
                <div className="my-10">
                    <h1 className={`mb-2 text-3xl font-semibold`}>Profile</h1>
                    <p className="textPara">Manage your account information and documents</p>
                </div>
                <ProfileInfo />
            </Container>
        </div>
    )
}

export default InfluencerProfile