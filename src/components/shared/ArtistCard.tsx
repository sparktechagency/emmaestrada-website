import { IoLogoTiktok } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import { IUser } from "@/types/profile";
import { imageUrl } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

const ArtistCard = ({ data , userRole}: { data?: IUser, userRole?: any }) => {    
        
    const cardStyle = {
        backgroundImage: `url(${data?.image ? imageUrl + data?.image  : "/placeholder.png"})`
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
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                <div className="absolute flex items-center justify-between top-3 w-full px-3">
                    <div className="flex items-center  gap-2">
                        <IoIosStar size={15} color="#FDC700" />
                        <span className="text-white font-normal">4.9</span>
                    </div>
                    <Button size="sm" className=" right-5 glassBg">Follow <FaPlus size={2} /></Button>
                </div>

                <Link href={`/${userRole === "PROMOTER" ? "promotor/creator": "creator/creators"}/${data?._id}`}><div className="absolute bottom-0 w-full bg-white p-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3 ">

                        <Avatar className="w-10 h-10 border-2 relative">
                            <AvatarImage
                                src={`${imageUrl + data?.image}`}
                                alt={data?.name}
                                className="w-full h-full object-cover border-2 border-slate-300"
                            />
                            <AvatarFallback className="bg-orange-500 text-white text-2xl">
                                {data?.name?.[0]?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        {/* Creator Name */}
                        
                        <span className={`text-lg font-medium text-black ${!userRole && "blur-xs"}`}>
                            {data?.name ?? data?.userName}
                        </span>

                    </div>
                    {/* Social Icon */}
                    <div className="border p-1">
                        <IoLogoTiktok size={20} />
                    </div>
                </div></Link>
            </div>
        </div>
    );
};

export default ArtistCard;

