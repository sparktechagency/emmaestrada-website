"use client";
import Marquee from "react-fast-marquee";

export default function BrandLogos({brands}:any) {
    return (
        <div className="w-full space-y-9 h-20 sm:h-24 glassBg flex items-center rounded-none! mt-4 md:mt-10">
            {/* Bottom Row- right */}
            <Marquee
                pauseOnHover={true}
                speed={50}                
                direction="left"
                autoFill                
            >              
                {brands?.map((brand:any, i:number) => (
                    <div className="text-slate-300 text-2xl uppercase mx-6" key={i}>{brand?.name}</div>
                ))}              
                
            </Marquee>
        </div>
    );
}