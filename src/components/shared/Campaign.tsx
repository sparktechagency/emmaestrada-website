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

interface CampaignProps {
  campaigns: any;
}

const Campaign: React.FC<CampaignProps> = ({ campaigns }) => {
  console.log(campaigns);
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
                <CampaignCard
                  name={campaign.title}
                  budget={campaign.budget}
                  influencers={campaign.influencers}
                  dateRange={campaign.dateRange}
                  duration={campaign.duration}
                  progress={campaign.progress}
                  profileImg={campaign.profileImg}
                  rightImg={campaign.rightImg}
                  username={campaign.username}
                  displayName={campaign.displayName}
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

/*
  <div className="rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 lg:h-[421px] p-5 bg-[#FFF8F3]">
        
    <div className="flex flex-col order-2 md:order-1">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
          <span className="w-2 h-2 bg-white rounded-full" />
          Live
        </span>

        <div className="flex gap-2">
          <img src="/tiktokBlack.png" width={20} alt="" />
          <img src="/instagram.png" width={20} alt="" />
          <img src="/youtube.png" width={20} alt="" />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <img
          src="/dj.jpg"
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg">DJ Nadir</h3>
          <p className="text-gray-600 text-sm">@rikodj890</p>
        </div>
      </div>

      <hr className="my-3 border-gray-300" />

      <div className="space-y-1 text-[16px]">
        <p><span className="font-semibold">Title:</span> <span className="text-orange-500">Feel the Vibe</span></p>
        <p><span className="font-semibold">Types:</span> <span className="text-orange-500">Pop</span></p>
        <p><span className="font-semibold">Budget:</span> <span className="text-orange-500">$1000</span></p>
        <p><span className="font-semibold">Content Type:</span> <span className="text-orange-500">UCG</span></p>
      </div>

      <div className="mt-7">
        <p className="text-xs mb-2 flex justify-between text-gray-600">
          <span className="font-semibold">$700.60 of $8000 paid out</span>
          <span>20%</span>
        </p>
        <div className="h-2 bg-gray-300 rounded-full">
          <div className="h-2 bg-orange-500 rounded-full w-[20%]" />
        </div>
      </div>

      <button className="bg-orange-500 hover:bg-orange-600 text-white w-full md:w-[150px] py-3 rounded-full mt-4 text-[17px] font-medium">
        View Campaign
      </button>
    </div>

    
    <div className="relative order-1 md:order-2">
      <img
        src="/images/campaign-img.png"
        alt="campaign"
        className="h-[300px] md:h-full w-full object-cover rounded-[12px]"
      />
    </div>
  </div>
  */
