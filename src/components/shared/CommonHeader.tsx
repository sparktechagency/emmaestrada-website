import React from 'react'

const CommonHeader = ({title}: {title: string}) => {
        const cardStyle = {
        backgroundImage: `url('/headerBg.png')`,
    };
  return (
    <div className="relative bg-cover bg-center bg-no-repeat h-[250px] md:h-[400px] font-sans"
                style={cardStyle}>
                    
    <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-4/5 md:w-full max-w-md py-8 backdrop-blur-[5px] bg-white/20 rounded-xl border border-white/30 flex items-center justify-center text-3xl md:text-5xl text-white font-semibold shadow">{title}</div>
    </div>
  )
}

export default CommonHeader