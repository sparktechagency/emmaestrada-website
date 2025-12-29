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
import { ICampaign } from "@/types/campaign";

interface CampaignProps {
  campaigns: any;
}

const Campaign = ({ campaigns }: {campaigns: any}) => {
  
  return (
    <section className="bottomPadding">
      <Container>
        <div>
          <h1 className="title text-center mb-3">
            <span className="text-primary">Campaigns</span> on the Horizon
          </h1>
          <p className="textPara text-center max-w-6xl mx-auto">
            Explore our handpicked campaigns that are driving real impact,
            inspiring communities, and shaping the future. Stay updated with the
            initiatives that matter most.
          </p>
        </div>
        <div className="relative w-full md:w-4/5 mx-auto flex justify-center py-10">
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
            spaceBetween={50}
            loop={true}
            initialSlide={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1.3 },
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
            {campaigns?.map((campaign: any) => (
              <SwiperSlide key={campaign._id}>
                <CampaignCard campaign={campaign} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation + Pagination */}
          <div className="absolute bottom-10 flex items-center justify-center w-full gap-10">
            <div className="swiper-pagination custom-pagination flex justify-center"></div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/campaigns">
            <Button
              size="lg"
              className="rounded-full w-[200px]! cursor-pointer"
            >
              View All
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Campaign;