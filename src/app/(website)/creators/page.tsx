import AllCreators from '@/components/ui/website/Artists'
import { myFetch } from '@/utils/myFetch';
import React from 'react'

const page = async() => {
        const  data = await myFetch("/creators");

        console.log("creators", data);
        
    return (
        <div>
            <AllCreators data={data}/>
        </div>
    )
}

export default page