"use client";

import Container from "@/components/shared/Container";
import { useState } from "react";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { LoginPopup } from "@/components/shared/LoginPopup";
import { IUser } from "@/types/profile";
import "swiper/css";
import { Button } from "../../button";
import ArtistCard from "@/components/shared/ArtistCard";
import { useProfile } from "@/hooks/context/ProfileContext";
import { useRouter } from "next/navigation";

function ArtistsSection({ creators }: any) {
  const [open, setOpen] = useState(false);
  const {profile} = useProfile()
    
  const route = useRouter()

  const handleViewAll = ()=>{
    if(profile){
      route.push("/creators")
    }else{
      setOpen(true)
    }
  }
  return (
    <section className="bottomPadding">
      <Container>
        <div>
          <h1 className="title text-center mb-3">
            Star <span className="text-primary">Creator</span> You’ll Love {creators?.data?.length}
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
              1280: { slidesPerView: 3.5 }, // Desktop
            }}
          >
            {creators?.length !== 0 && creators?.map((data: IUser) => ( 
              <SwiperSlide key={data._id}>
                <ArtistCard data={data} profile={profile}/>
              </SwiperSlide>
            ))} 
          </Swiper>
        </div>
      </Container>

      <div className="flex justify-center mt-10">
        {/* <Link href="/artists"><Button onClick={()=>setOpen(true)} size="lg" className="rounded-full !w-[200px] cursor-pointer">View All</Button></Link> */}
        <Button onClick={() => handleViewAll()} size="lg" className="rounded-full w-[200px]! cursor-pointer">View All</Button>
      </div>
      {open && <LoginPopup open={open} onClose={() => setOpen(false)} />}
    </section>
  );
}

export default ArtistsSection;


