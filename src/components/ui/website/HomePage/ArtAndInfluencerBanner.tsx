import Container from '@/components/shared/Container'
import React from 'react'

const ArtAndInfluencerBanner = () => {
    return (
        <section className="section flex justify-center items-start ">
            <Container>

                {/* <!-- Primary Grid: 1 column on mobile, 12 columns on large screens --> */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    <div className="lg:col-span-3 lg:row-span-2 rounded-3xl overflow-hidden card-shadow bg-gray-200">
                        <img
                            src="/images/photo1.png"
                            alt="Man listening to music with headphones on a mobile app"
                            className="w-full h-full object-cover min-h-[300px] " />
                    </div>

                    <div className="lg:col-span-9 pt-4 order-first lg:order-none">
                        <h1 className="title">
                            Are you an <span className="text-primary">Music Promotor</span> or an <span className="text-primary">Creator</span>?
                        </h1>
                    </div>
                    <div className="lg:col-span-4 rounded-3xl overflow-hidden card-shadow bg-gray-400 h-[200px]">
                        <img
                            src="/images/photo2.png"
                            alt="Woman with headphones looking at her phone"
                            className="w-full h-full object-cover aspect-video lg:aspect-square" />
                    </div>

                    <div className="lg:col-span-5 rounded-3xl  p-6 sm:p-8 glassBg  flex flex-col justify-center ">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">As an Creator</h2>
                        <p className="text-lg text-gray-600">
                            Join campaigns, create content, get paid, and grow your influence by promoting music you love.
                        </p>
                    </div>
                    <div className="lg:col-span-7 rounded-3xl  p-6 sm:p-8 glassBg flex flex-col justify-center ">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">As an Promotor</h2>
                        <p className="text-lg text-gray-600">
                            Promote your music, collaborate with influencers, track performance, and grow your audience globally.
                        </p>
                    </div>

                    <div className="lg:col-span-5 grid grid-cols-2 gap-4 lg:h-[200px]">
                        <div className="rounded-xl overflow-hidden card-shadow bg-red-400 ">
                            <img
                                src="/images/signing1.png"
                                alt="Female singer performing on stage"
                                className="w-full h-full object-cover" />
                        </div>
                        <div className="rounded-xl overflow-hidden card-shadow bg-gray-800 ">
                            <img
                                src="/images/signing2.png"
                                alt="Male vocalist performing aggressively"
                                className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default ArtAndInfluencerBanner