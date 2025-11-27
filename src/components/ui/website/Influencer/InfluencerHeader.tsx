import React from 'react'
import { Button } from '../../button';
import {
    Music,
    User,
    BarChart3,
    MessageSquare,
    Shield,
    UserCircle,
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    Repeat,
} from "lucide-react";
import Link from 'next/link';
import Container from '@/components/shared/Container';

const InfluencerHeader = () => {
    const displayLinks = [
        { link: "campaigns", label: "Campaigns", icon: Music },
        { link: "creator", label: "Creator", icon: User },
        { link: "promotors", label: "Promotors", icon: User },
        { link: "analytics", label: "Analytics", icon: BarChart3 },
        { link: "messages", label: "Messages", icon: MessageSquare },
        { link: "trusted", label: "Trusted Creators", icon: Shield },
        { link: "profile", label: "Profile", icon: UserCircle },
    ];
    return (
        <div>
            <Container>
                <div className="mt-40 mb-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ">
                        <button className='btn flex items-center gap-2 bg-white font-semibold text-black text-lg font-sans! rounded-full! shadow-md'> <div className="w-2 h-2 bg-green-500 rounded-full" /><span>Currently viewing as: Creator</span></button>

                        <button className="btn bg-primary text-white flex items-center w-full sm:w-auto text-lg rounded-full! shadow-md">
                            <Repeat className="w-4 h-4 mr-2" />
                            Switch into music promoter
                        </button>
                    </div>

                </div>

                {/* Main Navigation Tabs */}
                <div className="flex gap-3 overflow-x-auto no-scrollbar p-4 glassBg rounded-md shadow-md!">
                    {displayLinks && displayLinks?.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link href={item?.link} key={item?.link}
                                className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg whitespace-nowrap transition-colors bg-white text-gray-700 hover:bg-gray-50 border border-gray-300
                  }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </div>
    )
}

export default InfluencerHeader