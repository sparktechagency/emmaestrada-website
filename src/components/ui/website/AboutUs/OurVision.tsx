import React from 'react'
import { Button } from '../../button'
import Image from 'next/image'

const OurVision = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-28 items-center ">
<div className="md:col-span-5 mt-10 md:mt-0 flex justify-center items-center">
                <Image
                width={600}
                height={500}
                    src="/images/videoMaking.png"
                    alt="Stylized 3D bar chart showing significant growth with an upward arrow"
                    className="w-full h-auto object-contain "
                />
            </div>


            <div className="md:col-span-7 md:mt-0 mt-8">
                <div>
                    <h1 className="title">
                        Our Vision                        
                    </h1>
                    <p className="mt-4 mb-8 textPara">
                        Our mission is to create a seamless platform where artists can easily promote their music and influencers can earn by sharing music they love.   <br /> 
                        Our mission is to create a seamless platform where artists can easily promote their music and influencers can earn by sharing music they love. We empower artists to connect with influencers, helping them expand their reach,
                    </p>                    
                </div>
            </div>
        </div>
    )
}

export default OurVision