import CommonHeader from '@/components/shared/CommonHeader'
import React from 'react'
import Notifications from './Notifications'
import getProfile from '@/utils/getProfile'

const NotificationPage = async () => {
  const proifle = await getProfile()
  return (
    <div className="">
        {/* <CommonHeader title="Notifications"/> */}
        <Notifications profile={proifle}/>
    </div>
  )
}

export default NotificationPage