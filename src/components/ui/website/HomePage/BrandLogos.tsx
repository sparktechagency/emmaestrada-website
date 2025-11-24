"use client";

import Container from "@/components/shared/Container";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const BrandLogos = () => {
  const brands = [
    "H&M",
    "L'OREAL",
    "LVMH",
    "M",
    "MICHELIN",
    "PHILIPS",
    "Shiseido",
    "U",
    "UNIVERSAL",
  ];

  return (
    <section style={{borderInline: 0}} className="border-t border-white/10 glassBg backdrop-blur-xl !rounded-none absolute w-full bottom-10 z-20">      
        <div className=" py-8 md:py-10">

          {/* Swiper Carousel - Desktop */}
          <div className="hidden md:block">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={6}
              spaceBetween={40}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              speed={3000} // smooth speed
            >
              {brands.map((brand) => (
                <SwiperSlide key={brand}>
                  <div className="text-white/60 hover:text-white transition-colors text-lg lg:text-xl uppercase tracking-wider text-center">
                    {brand}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Swiper Carousel - Mobile */}
          <div className="md:hidden">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={3}
              spaceBetween={20}
              loop
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              speed={2500}
            >
              {brands.map((brand) => (
                <SwiperSlide key={brand}>
                  <div className="text-white/60 text-base uppercase tracking-wider text-center">
                    {brand}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>      
    </section>
  );
};

export default BrandLogos;
