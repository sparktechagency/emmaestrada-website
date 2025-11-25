"use client";

import { motion } from "framer-motion";

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
    <section
      style={{ borderInline: 0 }}
      className="border-t border-white/10 glassBg backdrop-blur-xl !rounded-none absolute w-full bottom-10 z-20"
    >
      <div className="py-8 md:py-10 overflow-hidden">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            duration: 50,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...brands, ...brands].map((brand, idx) => (
            <span
              key={idx}
              className="text-white/60 hover:text-white transition-colors text-lg lg:text-xl uppercase tracking-wider"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandLogos;
