"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < testimonials.length - 1) setIndex(index + 1);
  };
  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="relative w-full flex justify-center h-full pt-5 md:pt-16 pb-30 md:pb-56">
      <div className="relative w-full md:w-[90%] h-[130px]">{testimonials.map((item, i) => {
        const isActive = i === index;
        const isGone = i < index;

        // Correct alternating rotation based on relative position
        const rotation = (isActive ? 0 : (i - index) % 2 === 0 ? -2 : 5);

        return (
          <motion.div
            key={i}
            className="absolute top-0 left-0 w-full bg-white/30 backdrop-blur-2xl shadow-xl border-2 rounded-3xl p-2 md:p-8"
            style={{ zIndex: testimonials.length - i }}
            animate={{
              rotate: isGone ? -50 : rotation,
              y: isGone ? -500 : isActive ? -10 : 0,   // active card moves slightly up
              opacity: isGone ? 0 : 1,
              scale: isActive ? 1 : 0.95,
            }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <p className="text-xs sm:text-md lg:text-lg text-gray-700 mb-6 leading-relaxed">{item.text}</p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="relative w-10 h-10 sm:w-16 sm:h-16 md:w-[60px] md:h-[60px]">
                <Image
                  src="/images/profile21.jpg"
                  alt={item.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm md:text-2xl font-bold">{item.name}</h3>
                <p className="text-xs md:text-gray-500">{item.role}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
      </div>

      {/* Navigation */}
      <div className="absolute z-99 w-4/5 bottom-0 flex justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="p-1 md:p-3 bg-white shadow text-black rounded-full disabled:opacity-30"
        >
          <ArrowLeft className="text-md md:text-lg" />
        </button>

        <button
          onClick={handleNext}
          disabled={index === testimonials.length - 1}
          className="p-1 md:p-3 bg-white shadow text-black rounded-full disabled:opacity-30"
        >
          <ArrowRight className="text-md md:text-lg" />
        </button>
      </div>
    </div>
  );
}



const testimonials = [
  {
    text: `“As an influencer, Musiconic gave me the opportunity to collaborate with incredible artists and get paid for content I truly believe in. It’s the perfect platform for creators who want to promote great music and earn while doing it!”r creators who want to promote great music and earn while doing it!””`,
    name: "Jake Moore",
    role: "Music Influencer",
    img: "/mnt/data/9c929182-9ecc-4713-8365-e840861eeec4.png",
  },
  {
    text: `“As an influencer, Musiconic gave me the opportunity to collaborate with incredible artists and get paid for content I truly believe in. It’s the perfect platform for creators who want to promote great music and earn while doing it!”`,
    name: "Emily Carter",
    role: "Lifestyle Creator",
    img: "/mnt/data/portrait1.png",
  },
  {
    text: `“As an influencer, Musiconic gave me the opportunity to collaborate with incredible artists and get paid for content I truly believe in. It’s the perfect platform for creators who want to promote great music and earn while doing it!”`,
    name: "Liam Anderson",
    role: "Independent Artist",
    img: "/mnt/data/portrait2.png",
  },
  {
    text: `“As an influencer, Musiconic gave me the opportunity to collaborate with incredible artists and get paid for content I truly believe in. It’s the perfect platform for creators who want to promote great music and earn while doing it!”`,
    name: "Sophia Reyes",
    role: "Content Creator",
    img: "/mnt/data/portrait3.png",
  },
  {
    text: `“As an influencer, Musiconic gave me the opportunity to collaborate with incredible artists and get paid for content I truly believe in. It’s the perfect platform for creators who want to promote great music and earn while doing it!”`,
    name: "Daniel Brooks",
    role: "Music Promoter",
    img: "/mnt/data/portrait4.png",
  },
];
