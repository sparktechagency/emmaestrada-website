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

import "./campaign.css";
import CampaignCard from "./CampaignCard";
import Container from "./Container";
import Link from "next/link";
import { Button } from "../ui/button";

const Campaign: React.FC = () => {
  return (
    <section className="section">
      <Container>
        <div>
          <h1 className="title text-center mb-3">
            <span className="text-primary">Campaigns</span>  on the Horizon
          </h1>
          <p className="textPara text-center max-w-6xl mx-auto">
            Explore our handpicked campaigns that are driving real impact, inspiring communities, and shaping the future. Stay updated with the initiatives that matter most.
          </p>
        </div>
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
              clickable: true,
            }}
            loop={true}
            initialSlide={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
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
            <div className="swiper-pagination custom-pagination flex justify-center"></div>
          </div>
        </div>
         <div className="flex justify-center mt-10">
        <Link href="/campaigns"><Button size="lg" className="rounded-full !w-[200px] cursor-pointer">View All</Button></Link>
      </div>
      </Container>
    </section>
  );
};

export default Campaign;
