
import Marquee from "react-fast-marquee";

interface Brand {
  name: string;
  logo: string;
  link: string;
  _id: string;
}
const BrandLogos = ({ brands }: { brands: any }) => {

  console.log("brand", brands);
  
  return (
    <>
      <section
        style={{ borderInline: 0 }}
        className="border-t border-white/10 glassBg backdrop-blur-xl rounded-t-none! rounded-b-none! absolute w-full mt-10 md:bottom-10 z-20"
      >
        <div className="py-6 overflow-hidden">
          <div className="flex items-center">
            {brands && brands?.result?.map((brand:Brand, idx:number) => <Marquee key={idx} speed={50}> <div key={idx} className="marquee-item bg-transparent">
              <span className="text-slate-300 text-2xl uppercase">
                {brand.name}
              </span>
            </div></Marquee>)}
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandLogos;
