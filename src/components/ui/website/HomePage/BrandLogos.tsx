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
    <section className="border-t border-white/10 bg-gradient-to-r from-[#1a1a2e] via-[#2d1b3d] to-[#3d2817]">
      <Container>
        <div className="px-4 py-8 md:py-12">

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
      </Container>
    </section>
  );
};

export default BrandLogos;
