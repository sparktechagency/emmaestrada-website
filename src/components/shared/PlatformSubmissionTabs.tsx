import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

import { imageUrl } from '@/constants';
import ProfileImageWithUserData from '../ui/website/promotor/PromotorCampaignDetails/CampaignSubmission/ProfileImageWithUserData';
import ReelsAnalyticsChart from '../ui/website/promotor/PromotorCampaignDetails/CampaignSubmission/ReelsAnalyticsChart';
import PendingDropDown from '../ui/website/promotor/PromotorCampaignDetails/CampaignSubmission/PendingDropDown';
import { formatChatTime } from './FormatChatTime ';
import { FormatDate } from './FormatDate';

const PlatformSubmissionTabs = ({ submissions, connectedPlatforms = ["instagram", "tiktok", "youtube"] }: any) => {
        
    const submissionsByInfluencer = submissions.reduce((acc: any, submission: any) => {
        const influencerId = submission.influencerId._id;
        if (!acc[influencerId]) {
            acc[influencerId] = {
                influencer: submission.influencerId,
                submissions: []
            };
        }
        acc[influencerId].submissions.push(submission);
        return acc;
    }, {});

    const getPlatformIcon = (platform: any) => {
        const icons = {
            instagram: "/instagram.png",
            tiktok: "/tiktokBlack.png",
            youtube: "/youtube.png"
        };
        return icons[platform as keyof typeof icons] || "/default.png";
    };

    const getPlatformColor = (platform: any) => {
        const colors = {
            instagram: "from-purple-500 to-pink-500",
            tiktok: "from-black to-gray-800",
            youtube: "from-red-600 to-red-700"
        };
        return colors[platform as keyof typeof colors] || "from-gray-500 to-gray-600";
    };

    const formatViews = (views: any) => {
        if (!views) return '0';
        if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
        if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
        return views.toString();
    };

    return (
        <div className="">
            {Object.values(submissionsByInfluencer).map((influencerData: any, idx: number) => {
                const { influencer, submissions } = influencerData;

                // Group submissions by platform for this influencer
                const platformSubmissions = connectedPlatforms.reduce((acc: any, platform: any) => {
                    acc[platform] = submissions.filter((s: any) => s.platform === platform);
                    return acc;
                }, {});

                // Get platforms that have submissions
                const activePlatforms = connectedPlatforms.filter((p: any) => platformSubmissions[p]?.length > 0);
                const defaultPlatform = activePlatforms[0] || connectedPlatforms[0];

                return (
                    <Card key={idx} className="p-3 md:p-4  bg-transparent!">
                        {/* Influencer Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b">
                            <div className="flex items-center gap-3">
                                <ProfileImageWithUserData submission={submissions[0]} />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{influencer.name}</h3>
                                    <p className="text-sm text-gray-500">{influencer.email}</p>
                                </div>
                            </div>

                            {/* Connected Platforms Badge */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {submissions.map((sub: any, i: number) => (
                                    <div key={i} className="bg-gray-50 p-2 rounded-lg">
                                        <Image
                                            src={getPlatformIcon(sub.platform)}
                                            height={15}
                                            width={24}
                                            alt={sub.platform}
                                            className="h-5 w-6 object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Platform Tabs */}
                        <Tabs defaultValue={defaultPlatform} className="w-full bg-secondary/30 p-3 rounded-md">
                            <TabsList className="grid w-full grid-cols-3 mb-6 h-auto">
                                {connectedPlatforms.map((platform: any) => {
                                    const count = platformSubmissions[platform]?.length || 0;
                                    return (
                                        <TabsTrigger
                                            key={platform}
                                            value={platform}
                                            className="capitalize relative data-[state=active]:bg-primary py-2 px-3 text-sm md:text-base"
                                        >
                                            <Image
                                                src={getPlatformIcon(platform)}
                                                height={15}
                                                width={24}
                                                alt={platform}
                                                className="h-5 w-6 object-contain"
                                            />
                                            <span className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                                                <span className="truncate">{platform}</span>
                                            </span>
                                        </TabsTrigger>
                                    );
                                })}
                            </TabsList>

                            {connectedPlatforms.map((platform: any) => (
                                <TabsContent key={platform} value={platform} className="mt-0">
                                    {platformSubmissions[platform]?.length > 0 ? (
                                        <div className="space-y-4">
                                            {platformSubmissions[platform].map((submission: any) => (
                                                <Card key={submission._id} className="bg-transparent border-0 shadow-none pt-0">
                                                    <div className="">
                                                        {/* Submission Header */}
                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                                            <div className="mt-2 flex md:w-auto w-full justify-between md:justify-center items-center gap-2">
                                                                <span className="text-gray-800">Submitted Date : </span>
                                                                <span className="bg-black px-2 py-2 rounded-md text-sm text-white">{FormatDate(submission?.createdAt ?? submission?.updatedAt)}</span>
                                                            </div>
                                                            <div className="flex items-center gap-3 md:w-auto w-full justify-between md:justify-center">
                                                                <div className={`px-3 py-2.5 rounded-full bg-gradient-to-r ${getPlatformColor(platform)} text-white text-xs font-semibold capitalize`}>
                                                                    {platform}
                                                                </div>
                                                                <PendingDropDown submission={submission} />
                                                            </div>
                                                        </div>

                                                        {/* Video and Analytics */}
                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                            {/* Video Player */}
                                                            <div className="w-full">
                                                                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                                                                    <video
                                                                        controls
                                                                        preload="metadata"
                                                                        className="w-full h-full object-contain"
                                                                        aria-label="Submission video"
                                                                        src={`${imageUrl}${submission.video}`}
                                                                    >
                                                                        Your browser does not support the video tag.
                                                                    </video>
                                                                </div>
                                                            </div>

                                                            {/* Analytics Chart */}
                                                            <div className="w-full">
                                                                <ReelsAnalyticsChart views={submission.metrics?.views} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-lg">
                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                                                <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">No {platform} submissions yet</h4>
                                            <p className="text-sm text-gray-500 max-w-sm">This creator hasn't submitted any content for {platform}</p>
                                        </div>
                                    )}
                                </TabsContent>
                            ))}
                        </Tabs>
                    </Card>
                );
            })}
        </div>
    );
};

export default PlatformSubmissionTabs;