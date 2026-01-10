"use client";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

interface Brand {
  name: string;
  logo: string;
  link: string;
  _id: string;
}

const BrandLogos = ({ brands }: { brands: any }) => {
  
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div
        className="relative min-h-30 z-20 mt-12 md:mt-16 lg:mt-20 overflow-hidden"
        aria-hidden="true"
      >
        <div className="h-20 z-10 absolute top-12 left-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-6 w-[150%] bg-primary1 opacity-20" />
        <div className="h-16 sm:h-20 z-10 absolute top-12 left-1/2 -translate-y-1/2 -translate-x-1/2 rotate-3 w-[150%] bg-primary2" />
      </div>
    );
  }

  return (
    <div className="">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative min-h-30 z-20 mt-12 md:mt-16 lg:mt-20"
        aria-label="Brand Logos"
      >
        <div className="h-20 sm:h-24 z-10 absolute top-12 left-1/2 -translate-y-1/2 -translate-x-1/2  w-[150%] glassBg rounded-none! flex items-center pointer-events-none shadow-lg">
          <Marquee
            speed={50}
            gradient={false}
            autoFill={true}
            direction="right"
            className="w-full flex items-center gap-10"
          >
            {brands?.data?.map((brand: Brand, idx: number) => (
              <div className="text-slate-300 text-2xl uppercase mx-6">
                {brand.name}
              </div>
            ))}
          </Marquee>
        </div>
      </motion.section>

{/* 
      {brands && [...brands, ...brands]?.map((brand: Brand, idx: number) => <Marquee key={idx} speed={50}> <div key={idx} className=" bg-transparent">
      </div></Marquee>)} */}
    </div>
  );
};

export default BrandLogos;
