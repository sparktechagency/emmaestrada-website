"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import CampaignCard from "./CampaignCard";

const Testimonial: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-10 ">
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}        
        centeredSlides={true}
        // loop={true}
        initialSlide={1}
        slidesPerView={2}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          scale: 1.0,
          modifier: 2.5,
          slideShadows: false,
        }}
        className="mySwiper campaign-swiper "
      >
        {[1, 2, 3, 4,5,6,7,8].map((i) => (
          <SwiperSlide key={i}>
            <CampaignCard
              name="Feel the Vibe"
              budget="$1000"
              influencers="25/25"
              dateRange="01/06/2024 - 30/06/2024"
              duration="30 days"
              progress={20}
              profileImg="/dj.jpg"
              rightImg="/dj-right.jpg"
              username="rikodj890"
              displayName="DJ Nadir"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;


// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCoverflow, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-coverflow";

// const movies = [
//   {
//     id: 1,
//     img: "https://triple-slider.uiinitiative.com/images/thor-ragnarok.jpg",
//   },
//   {
//     id: 2,
//     img: "https://triple-slider.uiinitiative.com/images/suicide-squad.jpg",
//   },
//   {
//     id: 3,
//     img: "https://triple-slider.uiinitiative.com/images/spider-man.jpg",
//   }
// ];

// export default function Testimonial() {
//   return (
//     <div className="w-full flex justify-center py-10">
//       <div className="w-[90%] max-w-5xl">
//         <Swiper
//           modules={[EffectCoverflow, Autoplay]}
//           effect="coverflow"
//           grabCursor={true}
//           centeredSlides={true}
//           slidesPerView={3}
//           loop={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           coverflowEffect={{
//             rotate: 0,
//             stretch: 0,
//             depth: 200,
//             scale: 0.8,
//             modifier: 1,
//             slideShadows: false,
//           }}
//           className="mySwiper"
//         >
//           {movies.map((item) => (
//             <SwiperSlide key={item.id}>
//               <div className="relative rounded-2xl overflow-hidden shadow-xl">
//                 <img
//                   src={item.img}
//                   alt="movie"
//                   className="w-full h-[350px] object-cover"
//                 />

//                 {/* Dark overlay only for side slides */}
//                 <div className="absolute inset-0 bg-black/40 swiper-slide-prev:bg-black/60 swiper-slide-next:bg-black/60"></div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Tailwind extra styles */}
//       <style jsx global>{`
//         .swiper-slide {
//           transition: 0.4s ease;
//         }

//         /* Center slide bigger */
//         .swiper-slide-active {
//           transform: scale(1.08) !important;
//           z-index: 10;
//         }

//         /* Side slides slightly faded */
//         .swiper-slide-next,
//         .swiper-slide-prev {
//           filter: blur(0.5px) brightness(0.7);
//         }
//       `}</style>
//     </div>
//   );
// }
