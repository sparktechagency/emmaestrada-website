"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Mousewheel, Navigation } from "swiper/modules";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";

import "./testimonialCarousel.css"

export default function TestimonialCarousel() {
    return (
        <div className="relative pt-36 pb-16">
        <Swiper
            direction="vertical"
            effect="cards"
            modules={[EffectCards, Navigation, Mousewheel]}
             navigation={{
              nextEl: ".swiper-button-prev-custom",
              prevEl: ".swiper-button-next-custom",
            }}
            cardsEffect={{
                rotate: true,
                perSlideOffset: 8,
                perSlideRotate: 2,
                slideShadows: false,
            }}
            centeredSlides
            grabCursor={true}
            initialSlide={0}
            speed={700}
            loop={true}
            mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
            }}
            className="tesimonialCarousel w-4/5 h-[300px]"
        >
            {testimonials.map((item, i) => (
                <SwiperSlide key={i}>
                    <div className=" p-8  flex flex-col gap-6">
                        <p className="text-lg leading-relaxed text-gray-700">{item.text}</p>


                        <div className="flex items-center gap-4">
                            <Image
                                src="/images/profile21.jpg"
                                width={60}
                                height={60}
                                alt={item.name}
                                className="rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-2xl font-bold">{item.name} {i + 1}</h3>
                                <p className="text-gray-500">{item.role}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>

         <div className="absolute top-5 z-20 w-full max-w-4xl mx-auto flex items-center justify-between  pointer-events-none px-6">
          <button             
            className="swiper-button-prev-custom bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition duration-200 pointer-events-auto text-orange-600 focus:outline-none focus:ring-4 focus:ring-white/50 disabled:opacity-50" 
            aria-label="Previous Testimonial"            
          >
            <IoMdArrowBack size={30} color="black" />
          </button>
          <button             
            className="swiper-button-next-custom bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition duration-200 pointer-events-auto text-orange-600 focus:outline-none focus:ring-4 focus:ring-white/50 disabled:opacity-50" 
            aria-label="Next Testimonial"            
          >
           <IoMdArrowForward size={30} color="black" />
          </button>
        </div>
        </div>
    );
}


const testimonials = [
  {
    text: `“As an influencer, Musiconic gave me the opportunity to collaborate with incredible artists and get paid for content I truly believe in. It’s the perfect platform for creators who want to promote great music and earn while doing it!”r creators who want to promote great music and earn while doing it!””`,
    name: "Jake Moore",
    role: "Music Influencer",
    img: "/mnt/data/9c929182-9ecc-4713-8365-e840861eeec4.png",
  },
  {
    text: `“As an influencer, Musiconic gave me the opportunity to collaborate with incredible artists and get paid for content I truly believe in. It’s the perfect platform for creators who want to promote great music and earn while doing it!”`,
    name: "Emily Carter",
    role: "Lifestyle Creator",
    img: "/mnt/data/portrait1.png",
  },
  {
    text: `“As an influencer, Musiconic gave me the opportunity to collaborate with incredible artists and get paid for content I truly believe in. It’s the perfect platform for creators who want to promote great music and earn while doing it!”`,
    name: "Liam Anderson",
    role: "Independent Artist",
    img: "/mnt/data/portrait2.png",
  },
  {
    text: `“As an influencer, Musiconic gave me the opportunity to collaborate with incredible artists and get paid for content I truly believe in. It’s the perfect platform for creators who want to promote great music and earn while doing it!”`,
    name: "Sophia Reyes",
    role: "Content Creator",
    img: "/mnt/data/portrait3.png",
  },
  {
    text: `“As an influencer, Musiconic gave me the opportunity to collaborate with incredible artists and get paid for content I truly believe in. It’s the perfect platform for creators who want to promote great music and earn while doing it!”`,
    name: "Daniel Brooks",
    role: "Music Promoter",
    img: "/mnt/data/portrait4.png",
  },
];
