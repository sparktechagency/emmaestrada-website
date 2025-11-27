import { bricolage } from '@/constants/bricolage'
import React from 'react'

const Overview = () => {
    return (
        <div className='section'>
            <div className="grid lg:grid-cols-3 gap-10 items-center">

                {/* <!-- Left big image --> */}
                <div className="lg:col-span-1 md:h-[300px]">
                    <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-5 ${bricolage.className}`}>
                        Overview
                    </h2>
                    <img
                        src="/images/musicPlayer.png"
                        alt="Music player image"
                        className="w-full h-[230px] object-cover rounded-2xl "
                    />
                </div>

                {/* <!-- Middle portrait image --> */}
                <div className="lg:col-span-1 md:h-[300px]">
                    <img
                        src="/images/musicListen.png"
                        alt="Music player image"
                        className="w-full h-full object-cover rounded-2xl "
                    />
                </div>

                {/* <!-- Right text --> */}
                <div className="lg:col-span-1 md:h-[300px]">
                    <p className="text-lg md:text-xl leading-relaxed text-gray-700 pr-24">
                        We empower artists to promote their music by collaborating with
                        influencers, while offering influencers the opportunity to earn by
                        sharing music they love.
                        <br /><br />
                        The power of music promotion is in your hands.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Overview