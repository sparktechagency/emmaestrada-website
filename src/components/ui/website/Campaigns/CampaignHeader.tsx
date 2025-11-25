import React from 'react'

const CampaignHeader = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 items-center section">
            <div className="md:col-span-5 mt-10 md:mt-0 flex justify-center items-center">
                <img
                    src="/images/campainPhoto.png"
                    alt="Stylized 3D bar chart showing significant growth with an upward arrow"
                    className="w-full h-auto  rounded-lg float-left"
                />
            </div>

            <div className="md:col-span-7 ">
                <div>
                    <h1 className="title">                        
                        <span className='text-primary'> Build</span> Your <span className='text-primary'>Presence</span>  Through Your Music.                    
                    </h1>
                    <p className="mt-4 mb-8 textPara">
                        Easily promote your tracks, collaborate with influencers, and grow your fanbase through targeted campaigns. Easily promote your tracks, collaborate with influencers.
                    </p>

                    <button  className='btn  bg-primary text-white'>Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default CampaignHeader