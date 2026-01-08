import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

import { formatDate } from '@/components/shared/DateFormat';
import { imageUrl } from '@/constants';
import Link from 'next/link';
import ReelsAnalyticsChart from '../../promotor/PromotorCampaignDetails/CampaignSubmission/ReelsAnalyticsChart';
import CreatorDropDownMenu from './CreatorDropDownMenu';


const SubmittedCampaignsTabs = ({ submissions, connectedPlatforms = ["instagram", "tiktok", "youtube"] }: any) => {
    const submissionsByCampaign = submissions.reduce((acc: any, submission: any) => {
        const campaignId = submission.campaignId._id;
        if (!acc[campaignId]) {
            acc[campaignId] = {
                campaign: submission.campaignId,
                submissions: []
            };
        }
        acc[campaignId].submissions.push(submission);
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

    return (
        <div className="">
            {Object.values(submissionsByCampaign).map((campaignData: any, idx: number) => {
                const { campaign, submissions } = campaignData;
                const platformSubmissions = connectedPlatforms.reduce((acc: any, platform: any) => {
                    acc[platform] = submissions.filter((s: any) => s.platform === platform);
                    return acc;
                }, {});

                const activePlatforms = connectedPlatforms.filter((p: any) => platformSubmissions[p]?.length > 0);
                const defaultPlatform = activePlatforms[0] || connectedPlatforms[0];

                return (
                    <Card key={idx} className="p-3 md:p-4 bg-transparent!">
                        {/* Platform Tabs */}
                        <Tabs defaultValue={defaultPlatform} className="w-full bg-secondary/30 p-3 rounded-md">
                            <TabsList className="grid w-full grid-cols-3 mb-2 h-auto">
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
                                                            <Link href={`/creator/${campaign._id}`}> <div className="flex items-center gap-3">
                                                                <Image
                                                                    src={`${campaign.thumbnail ? imageUrl + campaign.thumbnail : "/placeholder.png"}`}
                                                                    unoptimized
                                                                    height={40}
                                                                    width={40}
                                                                    alt={campaign.title || campaign.name}
                                                                    className="rounded-md w-11 h-11  object-cover"
                                                                />
                                                                <div>
                                                                    <h4 className="text-sm font-semibold text-gray-900">{campaign.title || campaign.name}</h4>
                                                                    <p className="text-xs text-gray-500">{submissions.length} submission{submissions.length !== 1 ? 's' : ''}</p>
                                                                </div>
                                                            </div>
                                                            </Link>

                                                            <div className="flex items-center gap-3 md:w-auto w-full justify-between md:justify-center">
                                                                <div className="flex md:justify-center justify-between items-center gap-2">
                                                                    <span className="text-sm text-gray-800">Submitted: </span>
                                                                    <span className="bg-black px-2 py-1.5 rounded-md text-xs text-white">
                                                                        {formatDate(submission?.createdAt ?? submission?.updatedAt)}
                                                                    </span>
                                                                </div>
                                                                <CreatorDropDownMenu submission={submission}/>
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
                                            <p className="text-sm text-gray-500 max-w-sm">This campaign hasn't received any content for {platform}</p>
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

export default SubmittedCampaignsTabs;