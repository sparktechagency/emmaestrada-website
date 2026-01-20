import React from 'react'
import Image from 'next/image'
import Container from './Container';

const CommonHeader = ({title}: {title: string}) => {
  return (
    <div className="relative font-sans">
      {/* Optimized Background Image */}
      <Image
        src="/headerBg.png"
        alt="Header Background"
        fill
        priority
        quality={85}
        className="object-cover object-center -z-10"
        sizes="100vw"
      />
      
      <Container>
        <div className="relative h-[250px] lg:h-[400px]">
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-4/5 md:w-full max-w-lg py-8 backdrop-blur-[5px] bg-white/20 rounded-xl border border-white/30 flex items-center justify-center text-2xl md:text-4xl text-white font-semibold shadow">
            {title}
          </div>
        </div>
      </Container>            
    </div>
  )
}

export default CommonHeader