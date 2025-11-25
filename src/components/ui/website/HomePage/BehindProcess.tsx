"use client";

import Container from "@/components/shared/Container";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import React, { useMemo } from 'react';
import { Sparkles, Megaphone, DollarSign } from 'lucide-react';

const TIMELINE_STEPS = [
    {
        step: 1,
        title: "Create Campaign",
        description: "Upload your track, set your goals and budget, define your audience, and let our platform help you reach the right listeners, grow your fanbase, and amplify your music to the next level.",
        imageUrl: "https://media.self.com/photos/5e70f72443731c000882cfe7/4:3/w_2560%2Cc_limit/GettyImages-125112134.jpg",
        icon: Sparkles,
    },
    {
        step: 2,
        title: "Influencers Promote",
        description: "Our network of vetted influencers and curators will promote your music across various platforms, ensuring high-quality placements and genuine engagement with potential new fans.",
        imageUrl: "https://img.freepik.com/free-photo/joyful-pleased-music-producer-enjoying-his-high-quality-track-control-room_482257-93613.jpg?semt=ais_hybrid&w=740&q=80",
        icon: Megaphone,
    },
    {
        step: 3,
        title: "Track & Get Paid",
        description: "Track your campaign performance in real-time with detailed analytics. We handle the royalty collection and payments, ensuring you get paid quickly and transparently for every stream.",
        imageUrl: "https://cdn.prod.website-files.com/6450cabeeba5aa511c9ac878/645bc11256621458c3d4cb15_Brandtrack-dj.jpeg",
        icon: DollarSign,
    },
];

export default function BehindProcess() {
    return (
        <div className="bg-secondary py-[130px]">
            <Container>
                {/* Header */}
                <div className="mb-20 flex flex-col md:flex-row md:items-end ">
                    <div className="md:w-1/2">
                        <span className="px-10 py-3 bg-white text-primary rounded-md font-extrabold shadow-md text-6xl">
                            The Beat
                        </span>         
                        <h1 className="text-6xl font-extrabold text-gray-900 mt-10 leading-tight">
                            Behind the Process
                        </h1>               
                    </div>


                    <div className="md:w-1/2 flex items-center pt-3">
                        <p className="text-2xl leading-12 text-white">
                            Discover how our platform helps music creators and influencers
                            connect, grow, and shine
                        </p>
                    </div>
                </div>

                <div className="relative">
                    {/* Continuous Timeline Line: Absolutely positioned to run down the center */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
                        <div className="absolute top-0 bottom-0 w-full border-l-4 border-dashed border-white"></div>
                    </div>

                    {TIMELINE_STEPS.map((step, index) => (
                        <TimelineItem
                            key={step.step}
                            data={step}
                            isOdd={index % 2 === 0} // 0 is odd in a 0-indexed array, representing Step 1, 3, etc.
                            isLast={index === TIMELINE_STEPS.length - 1}
                        />
                    ))}
                </div>

            </Container>
        </div>
    );
}



const TimelineItem = ({ data, isOdd, isLast }: any) => {
    const { step, title, description, imageUrl, icon: Icon } = data;

    // Content block (text description)
    const contentBlock = (
        <div className={` h-full transition duration-300`}>
            <h3 className="text-4xl font-bold text-black mb-2">{title}</h3>
            <p className="text-white textPara leading-10">{description}</p>
        </div>
    );

    // Media block (image)
    const mediaBlock = (
        <div className="rounded-xl overflow-hidden shadow-lg h-full">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e: any) => {
                    e.target.onerror = null; // Prevents infinite loop if placeholder fails
                    e.target.src = `https://placehold.co/600x400/1e293b/f8fafc?text=Error`;
                }}
            />
        </div>
    );

    // Center column element (the number circle)
    // The continuous dashed line is now handled by the parent 'App' component.
    const centerElement = (
        <div className="flex flex-col items-center justify-start h-full pt-6">
            {/* Number Circle */}
            <div className="w-16 h-16 bg-black text-white font-extrabold text-2xl rounded-full flex items-center justify-center ring-4 ring-black  z-10 shadow-xl shadow-cyan-500/30">
                {step < 10 ? `0${step}` : step}
            </div>
        </div>
    );

    // Desktop (md and above) Layout - 5-column grid
    // We use items-start for top alignment and remove vertical transforms.
    if (isOdd) {
        return (
            <div className="grid grid-cols-5 gap-8 py-8 items-start">
                {/* Left: Text Block (col 1-2) */}
                <div className="col-span-2 hidden md:block">
                    {contentBlock}
                </div>
                {/* Center: Number/Circle (col 3) */}
                <div className="col-span-1 hidden md:flex flex-col h-full">
                    {centerElement}
                </div>
                {/* Right: Image Block (col 4-5) */}
                <div className="col-span-2 hidden md:block">
                    {mediaBlock}
                </div>

                {/* Mobile Stack Layout (col 1-5, always) */}
                <div className="col-span-5 md:hidden space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white text-slate-900 font-extrabold text-xl rounded-full flex items-center justify-center ring-2 ring-cyan-500 flex-shrink-0">
                            {step < 10 ? `0${step}` : step}
                        </div>
                        <h3 className="text-xl font-bold text-white">{title}</h3>
                    </div>
                    {mediaBlock}
                    <p className="text-white textPara font-normal">{description}</p>
                </div>
            </div>
        );
    }

    // Even steps (2, 4, ...) - Image on left, Text on right
    return (
        <div className="grid grid-cols-5 gap-8 py-8 items-start">
            {/* Left: Image Block (col 1-2) */}
            <div className="col-span-2 hidden md:block">
                {mediaBlock}
            </div>
            {/* Center: Number/Circle (col 3) */}
            <div className="col-span-1 hidden md:flex flex-col h-full">
                {centerElement}
            </div>
            {/* Right: Text Block (col 4-5) */}
            <div className="col-span-2 hidden md:block">
                {contentBlock}
            </div>

            {/* Mobile Stack Layout (col 1-5, always) */}
            <div className="col-span-5 md:hidden space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white text-slate-900 font-extrabold text-xl rounded-full flex items-center justify-center ring-2 ring-cyan-500 flex-shrink-0">
                        {step < 10 ? `0${step}` : step}
                    </div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>
                {mediaBlock}
                <p className="text-white textPara font-normal">{description}</p>
            </div>
        </div>
    );
};