"use client";
import { imageUrl } from "@/constants";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function BrandLogos({ brands }: any) {

    return (
        <div className="w-full space-y-9 h-20 sm:h-24 glassBg flex items-center rounded-none! mt-20 md:mt-10">
            {/* Bottom Row- right */}
            <Marquee
                pauseOnHover={true}
                speed={50}
                direction="left"
                autoFill                
            >
                {brands?.map((brand: any, i: number) => (
                    <a key={i} target="_blank" href={`${brand?.link ? brand?.link : "#"}`} className="relative h-14 w-48 inline-block mx-10"><Image className="object-fill" src={`${imageUrl}${brand?.image}`} fill unoptimized alt="Slides" /></a>
                ))}                    
            </Marquee>
        </div>
    );
}