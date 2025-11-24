"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./testimonial.css";
import CampaignCard from "./CampaignCard";

const Testimonial: React.FC = () => {
  return (
    <div className="relative w-full flex justify-center py-10">
      <Swiper
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        effect="coverflow"
        grabCursor
        centeredSlides
        navigation={{
          nextEl: ".swiper-next-btn",
          prevEl: ".swiper-prev-btn",
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        initialSlide={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 1.6 },
          1024: { slidesPerView: 2 },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          scale: 1,
          modifier: 2.5,
          slideShadows: false,
        }}
        className="campaign-swiper w-full"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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

      {/* Navigation + Pagination */}
      <div className="absolute bottom-10 flex items-center justify-center w-full gap-10">
        <div className="swiper-prev-btn custom-nav-btn">❮</div>

        <div className="max-w-[240px] w-full">
          <div className="custom-pagination flex justify-center"></div>
        </div>

        <div className="swiper-next-btn custom-nav-btn">❯</div>
      </div>
    </div>
  );
};

export default Testimonial;
