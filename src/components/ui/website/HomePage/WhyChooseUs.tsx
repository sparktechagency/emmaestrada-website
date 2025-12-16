import Container from '@/components/shared/Container';
import { RiLock2Fill } from "react-icons/ri";

import { FaLock, FaUserCheck, FaComments } from "react-icons/fa";
import { MdPayments, MdTrackChanges, MdAutoAwesome } from "react-icons/md";


const WhyChooseUs = () => {
    return (
        <div className="pt-12 bottomPadding" id='why_choose_us'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 ">

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
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full col-span-2 flex flex-col justify-between md:gap-5">
                    <div className='mb-4'>
                        <h1 className="text-3xl md:text-5xl font-bold mb-3">
                            Reason For Chosen <span className="text-primary">Us</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 max-w-6xl mx-auto">
                            Explore our handpicked campaigns that are driving real impact, inspiring communities,
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {chooseUsData.map((data, index) => (
                            <div key={index} className="flex items-center gap-4 glassBg p-2">
                                <div className="shrink-0 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] 
                                    w-10 h-10 md:w-14 md:h-14 
                                    bg-secondary/70 text-primary 
                                    flex items-center justify-center 
                                    rounded-full">
                                    {data.icon}
                                </div>

                                <div>
                                    <h3 className="font-semibold">{data.title}</h3>
                                    <p className="text-sm text-muted-foreground">{data.subTitle}</p>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>


            </div>
        </div>

    )
}

export default WhyChooseUs

const chooseUsData = [
    {
        title: "Secure Payments",
        subTitle: "Safe, encrypted transactions",
        icon: <FaLock className='text-xl md:text-3xl' />,
    },
    {
        title: "Smart Matching",
        subTitle: "Connect with the right creators",
        icon: <MdAutoAwesome className='text-xl md:text-3xl' />,
    },
    {
        title: "Instant Payouts",
        subTitle: "Fast and hassle-free payments",
        icon: <MdPayments className='text-xl md:text-3xl' />,
    },
    {
        title: "Live Tracking",
        subTitle: "Real-time campaign insights",
        icon: <MdTrackChanges className='text-xl md:text-3xl' />,
    },
    {
        title: "Verified Creators",
        subTitle: "Trusted and authenticated profiles",
        icon: <FaUserCheck className='text-xl md:text-3xl' />,
    },
    {
        title: "Easy Communication",
        subTitle: "Simple and seamless collaboration",
        icon: <FaComments className='text-xl md:text-3xl' />,
    },
];
