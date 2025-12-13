"use client";

import { motion } from "framer-motion";

const BrandLogos = () => {
  const brands = [
    { name: "Shiseido", logo: "/logos/shiseido.svg" },
    { name: "Universal", logo: "/logos/universal.svg" },
    { name: "H&M", logo: "/logos/hm.svg" },
    { name: "L'Oréal", logo: "/logos/loreal.svg" },
    { name: "LVMH", logo: "/logos/lvmh.svg" },
    { name: "Michelin", logo: "/logos/michelin.svg" },
    { name: "Philips", logo: "/logos/philips.svg" },
  ];

  return (
    <>

      {/* <section
        style={{ borderInline: 0 }}
        className="border-t border-white/10 glassBg backdrop-blur-xl rounded-none! absolute w-full mt-10 md:bottom-10 z-20"
      >
        <div className="py-8 md:py-10 overflow-hidden">
          <motion.div
            className="flex items-center gap-16 whitespace-nowrap"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 15,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...brands, ...brands].map((brand, idx) => (
              <img
                key={idx}
                src={brand.logo}
                alt={brand.name}
                className="
            h-8 md:h-10 lg:h-12
            opacity-60 hover:opacity-100
            transition-all duration-300
            grayscale hover:grayscale-0
          "
              />
            ))}
          </motion.div>
        </div>
      </section> */}

      <section
        style={{ borderInline: 0 }}
        className="border-t border-white/10 glassBg backdrop-blur-xl rounded-t-none! rounded-b-none! absolute w-full mt-10 md:bottom-10 z-20"
      >
        <div className="py-6 overflow-hidden">
          <div
            className="marquee-track"
            onMouseEnter={(e) =>
              (e.currentTarget.style.animationPlayState = "paused")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.animationPlayState = "running")
            }
          >
            {[...brands, ...brands].map((brand, idx) => (
              <div key={idx} className="marquee-item bg-transparent">
                <span className="text-slate-300 text-2xl uppercase">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default BrandLogos;
