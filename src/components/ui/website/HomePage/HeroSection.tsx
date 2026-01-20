import Container from "@/components/shared/Container";
import { Star, ArrowUpRight } from "lucide-react";
import BrandLogos from "./BrandLogos";
import { myFetch } from "@/utils/myFetch";
import Link from "next/link";
import Image from "next/image";

const HeroSection = async () => {

  const sliders = await myFetch(`/sliders/all`);
  const planners = await myFetch(`/home-campaign-planners/all`);

  return (
    <section className="relative h-screen md:py-20 pb-30 pt-24">
      <div className="absolute top-0 left-0 w-full h-full inset-0 pointer-events-none -z-10">
        <Image
          src="/headerBg.png"
          alt="background"
          fill
          className="object-cover"
          priority // loads immediately since it's above the fold
          quality={75} // reduce quality if acceptable (default is 75)
        />
      </div>
      <Container>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute z-30 top-10 left-[5%] w-20 h-20 md:w-24 md:h-24 bg-purple-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>

          <div className="absolute z-30 top-[30%] left-[10%] hidden lg:block">
            <img src="/instagram.png" className="w-24 h-24 blur-[3px]" />
          </div>
          <div className="absolute z-30 bottom-1/3 left-[20%] hidden lg:block">
            <img src="/tiktok.png" className="w-24 h-24 blur-[3px]" />
          </div>

          <div className="absolute z-30 top-[15%] right-[20%] hidden lg:block">
            <img src="/microphone.png" className="w-24 h-24 blur-[3px]" />
          </div>
          <div className="absolute z-30 bottom-2/5 right-[20%] hidden lg:block">
            <img src="/youtube.png" className="w-24 h-16 blur-[3px]" />
          </div>

          {/* Right - Orange Glow */}
          <div className="absolute top-1/2 right-[10%] w-24 h-24 bg-orange-500 rounded-full blur-2xl opacity-40"></div>
        </div>

        {/* Main Content */}
        <div className=" text-center relative z-10 mt-10 md:mt-32">
          {/* Top Reviews */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-24 mb-8 md:mb-20">
            {planners?.data?.map((item: any, i: number) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <p className="text-white text-sm md:text-2xl mb-2">
                  {item?.name}
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: item?.rating }).map((star, i: number) => (
                    <Star
                      key={i}
                      className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Main Heading */}
          <div className="">
            <h1 className="text-white text-4xl md:text-[72px] lg:text-7xl mb-4 md:mb-5 font-bold">
              Where Sound Meets
            </h1>
            <button className=" text-white md:text-5xl font-extrabold py-3 px-14 rounded-[40px] shadow-2xl shadow-orange-400/50 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-orange-300 bg-gradient-to-r from-[#ff8a00] to-[#ff4500] uppercase tracking-wider">
              SUCCESS
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-white/80 text-base md:text-lg lg:text-2xl mb-8 md:mb-5 max-w-2xl mx-auto px-4 leading-10 pt-5">
            Artists launch campaigns. Creators <br /> promote songs. Everyone
            wins.
          </p>

          {/* CTA Button */}
          <Link href="/login"><button className="group bg-white cursor-pointer text-gray-900 px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-gray-100 transition-all transform hover:scale-105">
            <span className="text-base md:text-lg">Get Started</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button></Link>
        </div>
      </Container>
      <BrandLogos brands={sliders?.data} />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
