import React from 'react'

const FooterBanner = () => {
  return (
    <div className="absolute -bottom-[100px] max-w-6xl mx-auto mt-12 py-24 px-4 sm:px-6 lg:px-8 bg-white rounded-sm shadow-lg relative overflow-hidden">

                <img
                    className="absolute shring-0 object-cover top-12 left-1/4 w-12 h-12 rounded-full shadow-lg hidden sm:block"
                    src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=80"
                    alt="Profile 1"
                />

                <img
                    className="absolute shring-0 object-cover top-10 right-1/4 w-8 h-8 rounded-full shadow-lg hidden sm:block"
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64"
                    alt="Profile 2"
                />

                <img
                    className="absolute shring-0 object-cover bottom-24 left-24 w-10 h-10 rounded-full shadow-lg hidden md:block"
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=72"
                    alt="Profile 3"
                />

                <img
                    className="absolute shring-0 object-cover bottom-28 right-16 w-14 h-14 rounded-full shadow-lg"
                    src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=96"
                    alt="Profile 4"
                />

                <img
                    className="absolute shring-0 object-cover top-1/4 left-16 w-10 h-10 rounded-full shadow-lg hidden md:block"
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=72"
                    alt="Profile 5"
                />

                <img
                    className="absolute shring-0 object-cover top-20 right-28 w-12 h-12 rounded-full shadow-lg hidden md:block"
                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=80"
                    alt="Profile 6"
                />


                <div className="relative z-10 text-center space-y-8 px-4">
                    <h2 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-gray-900 leading-18 max-w-4xl mx-auto font-sans">
                        Launch your next hit. <br /> Join today and start growing your audience
                    </h2>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                        <button className="w-full sm:w-auto px-10 py-4 bg-primary text-white text-lg font-semibold rounded-full hover:bg-orange-700 transition duration-300 shadow-xl transform ">
                            Start Your Campaign
                        </button>
                        <button className="w-full sm:w-auto px-10 py-4 bg-primary text-white text-lg font-semibold rounded-full hover:bg-orange-600 transition duration-300 shadow-xl transform ">
                            Become a Influencer
                        </button>
                    </div>
                </div>
            </div>
  )
}

export default FooterBanner