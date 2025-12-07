import Container from '@/components/shared/Container'
import React from 'react'

const Statics = () => {
    return (
        <Container>
            <div className="section">
                <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 items-center">

                    <div className="md:col-span-7 space-y-8">

                        <div>
                            <h1 className="title">
                                Our Rhythm by the
                                <span className="text-orange-500">Numbers</span>
                            </h1>
                            <p className="mt-4 textPara">
                                Explore our handpicked campaigns that are driving real impact, inspiring communities, and shaping the future. Stay updated with the initiatives that matter most.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-4">

                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-gray-900">$250K+</span>
                                <span className="font-sans mt-1 text-sm font-medium text-gray-500 uppercase tracking-wider">Artist Earned</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-gray-900">10K+</span>
                                <span className="font-sans mt-1 text-sm font-medium text-gray-500 uppercase tracking-wider">Verified Influencers</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-gray-900">3.5K+</span>
                                <span className="font-sans mt-1 text-sm font-medium text-gray-500 uppercase tracking-wider">Campaigns Launched</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-gray-900">45</span>
                                <span className="font-sans mt-1 text-sm font-medium text-gray-500 uppercase tracking-wider">Countries Reached</span>
                            </div>

                        </div>
                    </div>

                    <div className="md:col-span-5 mt-10 md:mt-0 flex justify-center items-center">


                        <img
                            src="/images/statics.png"
                            alt="Stylized 3D bar chart showing significant growth with an upward arrow"
                            className="w-full h-auto  rounded-lg float-right"
                        />
                    </div>

                </div>
            </div>            
        </Container>
    )
}

export default Statics