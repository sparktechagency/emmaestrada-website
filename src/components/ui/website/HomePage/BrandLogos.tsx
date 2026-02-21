"use client";
import { imageUrl } from "@/constants";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function BrandLogos({ brands }: any) {

    return (
        <div className="w-full space-y-9 h-28 glassBg flex items-center rounded-none! mt-20 overflow-visible border-x-0!">
            {/* Bottom Row- right */}
            <Marquee
                pauseOnHover={true}
                speed={50}
                direction="left"
                autoFill                
            >
                {brands?.map((brand: any, i: number) => (
                    <a key={i} target="_blank" href={`${brand?.link ? brand?.link : "#"}`} className="relative h-16 w-fit mx-6 overflow-visible flex justify-center items-center">
                        <Image className=" h-[100px] w-fit object-contain " src={`${imageUrl}${brand?.image}`} height={300}  width={500}  alt="Slides" draggable={false} /></a>
                ))}                    
            </Marquee>
        </div>
    );
}