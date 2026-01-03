import React, { useRef, useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Upload, X, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useParams } from 'next/navigation';
import { myFetch } from '@/utils/myFetch';
import { toast } from 'sonner';

type FormValues = {
    platform: string;
    postUrl: string;
};

const platforms = [
    { value: 'tiktok', label: 'TikTok' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'instagram', label: 'Instagram' },
];

const CampaignSubmitForm = ({ user, closeModal, setOpenAccVerifyModal, campaignId }: any) => {
    const params = useParams() as { id?: string }
    const [uploadedMedia, setUploadedMedia] = useState<File | null>(null);

    // Get connected platforms from user data
    const connectedPlatforms = new Set(
        (user?.connectedPlatforms || []).map((platform: string) => platform.toLowerCase())
    );

    const form = useForm<FormValues>({
        defaultValues: {
            platform: "",
            postUrl: "",
        },
    });

    const selectedPlatform = form.watch("platform");

    const isPlatformConnected = (platform: string) => {
        return connectedPlatforms.has(platform.toLowerCase());
    };

    const getPlaceholderByPlatform = (platform: string) => {
        switch (platform) {
            case 'tiktok':
                return 'https://www.tiktok.com/@username/video/123456789';
            case 'youtube':
                return 'https://www.youtube.com/watch?v=VIDEO_ID';
            case 'instagram':
                return 'https://www.instagram.com/p/POST_ID/';
            default:
                return 'Select a platform first';
        }
    };

    const handleFormSubmit = async (values: FormValues) => {
        if (!uploadedMedia) {
            Swal.fire({
                title: 'Media Required',
                text: 'Please upload a media file for verification.',
                icon: 'error',
                confirmButtonColor: '#2563eb',
            });
            return;
        }

        if (!isPlatformConnected(values.platform)) {
            Swal.fire({
                title: 'Platform Not Connected',
                html: `Please connect your <strong>${values.platform}</strong> account first.`,
                icon: 'warning',
                confirmButtonColor: '#2563eb',
                confirmButtonText: 'Connect Now',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    setOpenAccVerifyModal?.(true);
                }
            });
            return;
        }        

        try {
            const formData = new FormData();
            const data = {
                campaignId: params?.id,
                platform: values.platform,
                postUrl: values.postUrl
            };

            formData.append('data', JSON.stringify(data));
            formData.append('video', uploadedMedia);

            const res = await myFetch("/submissions/create", {
                method: "POST",
                body: formData
            });            
            if (res?.success) {
                toast.success("Campaign submitted successfully");
                closeModal();
            }
        } catch (error) {
            console.error("Error submitting campaign:", error);
            console.log("error", error);
                        
        }
    };

    return (
        <div className=''>
            <p className="font-semibold text-xl mb-3 text-center">Submit your social media post</p>
            <div className="mb-4 text-center w-4/5 mx-auto">
                <p className='text-center text-slate-500'>
                    Only views after you submit count towards payout. Submit as soon as you post to get paid for all of your views.
                </p>
            </div>

            {/* Warning message for unconnected platforms */}
            {connectedPlatforms.size === 0 && (
                <div className="flex items-start gap-2 mt-2 p-3 bg-red-200 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-md mb-2">
                    <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-orange-800 dark:text-orange-300">
                        <p className="font-medium">No platforms connected</p>
                        <p className="text-xs mt-1">
                            Please connect at least one social media platform to submit your campaign.
                        </p>
                    </div>
                </div>
            )}


            <Form {...form}>
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <FormField
                            control={form.control}
                            name="platform"
                            rules={{ required: "Platform is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Select Platform</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-secondary/20 h-[45px] w-full">
                                                <SelectValue placeholder="Choose a platform" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {platforms.map((platform) => {
                                                const isConnected = isPlatformConnected(platform.value);
                                                return (
                                                    <SelectItem
                                                        key={platform.value}
                                                        className="h-10"
                                                        value={platform.value}
                                                        disabled={!isConnected}
                                                        onClick={() => {
                                                            if (!isConnected) {
                                                                Swal.fire({
                                                                    title: 'Platform Not Connected',
                                                                    html: `Please connect your <strong>${platform.label}</strong> account before submitting a post.`,
                                                                    icon: 'warning',
                                                                    confirmButtonColor: '#2563eb',
                                                                    confirmButtonText: 'Connect Now',
                                                                    showCancelButton: true,
                                                                    cancelButtonText: 'Later',
                                                                    reverseButtons: true,
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        setOpenAccVerifyModal?.(true);
                                                                    }
                                                                });
                                                            }
                                                        }}
                                                    >
                                                        <div className="flex items-center justify-between w-full">
                                                            <span className={!isConnected ? 'text-gray-400' : ''}>
                                                                {platform.label}
                                                            </span>
                                                            {!isConnected && (
                                                                <span className="ml-2 text-xs text-orange-600 font-medium">
                                                                    Not Connected
                                                                </span>
                                                            )}
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />

                                    {/* Message for selected unconnected platform */}
                                    {selectedPlatform && !isPlatformConnected(selectedPlatform) && (
                                        <div className="flex items-start gap-2 mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                                            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                            <div className="text-sm text-red-800 dark:text-red-300">
                                                <p className="font-medium">Platform not connected</p>
                                                <p className="text-xs mt-1">
                                                    Connect your {selectedPlatform} account to submit posts.
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenAccVerifyModal?.(true)}
                                                    className="text-xs text-red-600 dark:text-red-400 underline hover:no-underline mt-1"
                                                >
                                                    Connect {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="postUrl"
                            rules={{ required: "Post URL is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Post URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={getPlaceholderByPlatform(selectedPlatform)}
                                            {...field}
                                            className="bg-secondary/20 h-[45px]"
                                            disabled={!selectedPlatform}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <FormLabel>Required Media File</FormLabel>
                        <MediaUploadArea
                            uploadedFile={uploadedMedia}
                            setUploadedFile={setUploadedMedia}
                        />
                        {!uploadedMedia && (
                            <p className="text-sm text-red-500">Media file is required for verification.</p>
                        )}
                    </div>

                    <button
                        onClick={form.handleSubmit(handleFormSubmit)}
                        type="button"
                        disabled={!uploadedMedia || !selectedPlatform || !isPlatformConnected(selectedPlatform)}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Submit Campaign
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default CampaignSubmitForm

const MediaUploadArea = ({ uploadedFile, setUploadedFile }: {
    uploadedFile: File | null
    setUploadedFile: (file: File | null) => void
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        if (!file) return

        setUploadedFile(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
    }

    const handleRemove = () => {
        setUploadedFile(null)
        setPreviewUrl(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const triggerFileInput = () => {
        if (!uploadedFile) fileInputRef.current?.click()
    }

    return (
        <div className="bg-orange-50/50 dark:bg-gray-700/50 flex flex-col items-center justify-center text-center rounded-lg min-h-[250px] border border-dashed border-orange-300 dark:border-gray-600">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,video/*"
            />

            {uploadedFile && previewUrl ? (
                <div className="flex flex-col items-center space-y-4 w-full p-4">
                    <div className="relative w-full h-[250px]">
                        {uploadedFile.type.startsWith('image') ? (
                            <img
                                src={previewUrl}
                                alt={uploadedFile.name}
                                className="w-full h-full rounded-lg object-cover border border-gray-300"
                            />
                        ) : (
                            <video
                                src={previewUrl}
                                controls
                                className="w-full h-full rounded-lg border border-gray-300 object-cover"
                            />
                        )}

                        <button
                            onClick={handleRemove}
                            type="button"
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 bg-white/80 dark:bg-gray-800/60 p-1 rounded-full"
                            aria-label="Remove uploaded file"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-sm truncate max-w-full">
                        {uploadedFile.name}
                    </p>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-3 p-6">
                    <p className="max-w-xl text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        Upload the original media file you posted. This file is required for verification.
                    </p>

                    <button
                        onClick={triggerFileInput}
                        type="button"
                        className="inline-flex items-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-transform active:scale-95"
                    >
                        <Upload className="h-4 w-4 mr-2" /> Choose File
                    </button>
                </div>
            )}
        </div>
    )
}