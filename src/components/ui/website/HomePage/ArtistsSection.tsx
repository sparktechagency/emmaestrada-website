"use client";

import React, { useState } from "react";
import Container from "@/components/shared/Container";
import ArtistCard from "@/components/shared/ArtistCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import { Button } from "../../button";
import Link from "next/link";
import { LoginPopup } from "@/components/shared/LoginPopup";

function ArtistsSection() {
  const [open, setOpen] = useState(false)
  return (
    <section className="section">
      <Container>
        <div>
          <h1 className="title text-center mb-3">
            Star <span className="text-primary">Creator</span> You’ll Love
          </h1>
          <p className="textPara text-center max-w-6xl mx-auto">
            Explore our handpicked campaigns that are driving real impact,
            inspiring communities, and shaping the future.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="mt-24">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 1800,
              disableOnInteraction: false,
            }}
            loop={true}
            grabCursor={true}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              480: { slidesPerView: 1.4 },
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 4.5 }, // Desktop
            }}
          >
            {mediaData.map((data) => (
              <SwiperSlide key={data.id}>
                <ArtistCard data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      <div className="flex justify-center mt-10">
        {/* <Link href="/artists"><Button onClick={()=>setOpen(true)} size="lg" className="rounded-full !w-[200px] cursor-pointer">View All</Button></Link> */}
        <Button onClick={()=>setOpen(true)} size="lg" className="rounded-full !w-[200px] cursor-pointer">View All</Button>
      </div>
      {open && <LoginPopup open={open} onClose={()=>setOpen(false)}/>}
    </section>
  );
}

export default ArtistsSection;

// Your static data
const mediaData = [
  { id: 1, title: "Feel the Vibe", creator: "Palash Musical", avatarColor: "bg-purple-500", imageUrl: "/images//artistPhoto.png", hoverColor: "shadow-purple-500/50" },
  { id: 2, title: "Midnight Drive", creator: "Jett Beats", avatarColor: "bg-orange-500", imageUrl: "/images//artistPhoto.png", hoverColor: "shadow-orange-500/50" },
  { id: 3, title: "Electric Dreams", creator: "Luna Synths", avatarColor: "bg-pink-500", imageUrl: "/images//artistPhoto.png", hoverColor: "shadow-pink-500/50" },
  { id: 4, title: "Rhythm Nation", creator: "Diva Drops", avatarColor: "bg-red-700", imageUrl: "/images//artistPhoto.png", hoverColor: "shadow-red-700/50" },
  { id: 5, title: "Acoustic Flow", creator: "Aqua Guitar", avatarColor: "bg-teal-600", imageUrl: "/images//artistPhoto.png", hoverColor: "shadow-teal-600/50" },
  { id: 6, title: "Deep Focus", creator: "Chilled Clouds", avatarColor: "bg-indigo-400", imageUrl: "/images//artistPhoto.png", hoverColor: "shadow-indigo-400/50" },
];
