import { IoLogoTiktok } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";

const ArtistCard = ({ data }:any) => {
    // Custom style to mimic the image background
    const cardStyle = {
        backgroundImage: `url('${data.imageUrl}')`,
    };

    return (
        <div
            className={`
                group relative h-full w-full rounded-xl overflow-hidden shadow-xl
                transition-all duration-300 ease-in-out                
                cursor-pointer border-b border-black/30 
            `}
        >
            {/* Image Area with Aspect Ratio */}
            <div 
                className="relative aspect-[3/4] bg-cover bg-center bg-no-repeat"
                style={cardStyle}
            >
                {/* Gradient Overlay (for Title visibility) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <Button size="sm" className="absolute top-5 right-5 glassBg">Follow <FaPlus size={2} /></Button>
                
                <div className="absolute bottom-0  flex items-center justify-between  w-full p-4 pb-16 bg-white/5 backdrop-blur-sm border-t border-white/10">
                    <h2 className="text-xl font-extrabold text-white leading-snug tracking-tight">
                        {data.title}
                    </h2>
                    <div className="flex items-center gap-2">
                        <IoIosStar size={15}  color="#FDC700"/>
                        <span className="text-white font-normal">4.9</span>
                    </div>
                </div>
                
                <div className="absolute bottom-0 w-full bg-white p-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3 ">
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full ${data.avatarColor} flex items-center justify-center text-xs font-semibold text-white ring-2 ring-white ring-offset-2 ring-offset-black/50`}>
                            {data.creator.charAt(0)}
                        </div>
                        {/* Creator Name */}
                        <span className="text-lg font-medium text-black blur-[3px]">
                            {data.creator}
                        </span>
                    </div>
                    {/* Social Icon */}
                    <div className="border p-1">
                    <IoLogoTiktok size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistCard;