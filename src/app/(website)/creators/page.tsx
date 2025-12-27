import AllCreators from '@/components/ui/website/Artists'
import { myFetch } from '@/utils/myFetch';
import React from 'react'

const page = async() => {
        const { data: creators } = await myFetch("/creators");

    return (
        <div>
            <AllCreators data={creators}/>
        </div>
    )
}

export default page