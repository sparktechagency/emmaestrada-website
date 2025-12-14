import Container from '@/components/shared/Container'
import React from 'react'

const WhyChooseUs = () => {
    return (
        <Container>
            <div className="pt-12 md:pt-[150px]">
                <div className='mb-10'>
                    <h1 className="title text-center mb-3">
                        Voices of Our <span className="text-primary">Fans</span>
                    </h1>
                    <p className=" textPara text-center max-w-6xl mx-auto">
                        Explore our handpicked campaigns that are driving real impact, inspiring communities,
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 ">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col gap-5 w-full h-full">

                        {/* TOP IMAGE – takes full available height */}
                        <div className="flex-1 rounded-xl overflow-hidden card-shadow">
                            <img
                                src="https://img.freepik.com/free-photo/joyful-pleased-music-producer-enjoying-his-high-quality-track-control-room_482257-93613.jpg"
                                alt="Music producer"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* BOTTOM IMAGES – fixed height */}
                        <div className="grid grid-cols-2 gap-4 h-[140px] sm:h-40">
                            <div className="rounded-xl overflow-hidden card-shadow">
                                <img
                                    src="/images/signing1.png"
                                    alt="Singer"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="rounded-xl overflow-hidden card-shadow">
                                <img
                                    src="/images/signing2.png"
                                    alt="Vocalist"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="w-full flex flex-col justify-between md:gap-5">
                        {[1, 2, 3].map((_, i) => (
                            <div
                                key={i}
                                className="rounded-3xl p-6 sm:p-8 glassBg"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    Safe and Secure Transaction
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Your money is protected with trusted and encrypted payments.
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </Container>

    )
}

export default WhyChooseUs