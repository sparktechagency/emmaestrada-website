"use client";

interface Brand {
  name: string;
  logo: string;
  link: string;
  _id: string;
}
const BrandLogos = ({ brands }: { brands: Brand[] }) => {
  return (
    <>
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
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <div key={idx} className="marquee-item bg-transparent">
                <span className="text-slate-300 text-2xl uppercase">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandLogos;
