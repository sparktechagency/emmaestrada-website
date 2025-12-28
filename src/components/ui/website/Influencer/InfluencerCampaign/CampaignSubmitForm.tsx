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
import { ArrowRight, CircleAlert, Upload, X } from 'lucide-react';
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

const CampaignSubmitForm = ({ closeModal, setOpenAccVerifyModal, campaignId }: any) => {

  const params = useParams() as {id?: string}
  console.log("params", params?.id);
  
    const [uploadedMedia, setUploadedMedia] = useState<File | null>(null);
    
    const form = useForm<FormValues>({
        defaultValues: {
            platform: "",
            postUrl: "",
        },
    });

    const selectedPlatform = form.watch("platform");

    const getPlaceholderByPlatform = (platform: string) => {
        switch(platform) {
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
            console.error("Submission blocked: Media file is required.");
            return;
        }

        try {
            // Create FormData to send both JSON and file
            const formData = new FormData();
            
            // Append the data object
            const data = {
                campaignId: params?.id,
                platform: values.platform,
                postUrl: values.postUrl
            };
            
            formData.append('data', JSON.stringify(data));
            formData.append('video', uploadedMedia);

            console.log('Submitting:', data);
            console.log('Video file:', uploadedMedia.name);

            const res = await myFetch("/submissions/create", {method: "POST", body: formData})
            console.log("resres", res);
            if(res?.success)            {
              toast.success("Submit campaign")
            }
            closeModal();
        } catch (error) {
            console.error("Error submitting campaign:", error);
        }
    };

    return (
        <div className=''>
            <p className="font-semibold text-xl mt-7 pb-3">Disclaimer</p>
            <div className="p-5 text-justify bg-secondary rounded-lg shadow-lg text-white">
                <p>Only views after you submit count towards payout. Submit as soon as you post to get paid for all of your views.</p>
            </div>

            <div onClick={()=>{setOpenAccVerifyModal(true); closeModal()}} className="p-5 bg-red-600 rounded-lg shadow-lg text-white mt-5 cursor-pointer hover:bg-red-700 transition">
                <p className='flex items-center justify-between text-justify'>
                    <span className='flex gap-1 items-center'>
                        <CircleAlert color='white' /> 
                        Confirm account ownership to submit this post. Click to verify.
                    </span>
                    <ArrowRight color='white'/>
                </p>
            </div>

            <p className="font-semibold text-lg mt-7 mb-6">Submit your social media post</p>
            <div className="mb-4">
                <p>Only views after you submit count towards payout. Submit as soon as you post to get paid for all of your views.</p>
            </div>

            <Form {...form}>
                <div className="space-y-4 mt-6">
                    <FormField
                        control={form.control}
                        name="platform"
                        rules={{ required: "Platform is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg'>Select Platform</FormLabel>
                                <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}                                    
                                >
                                    <FormControl>
                                        <SelectTrigger className='bg-secondary/20 h-12'>
                                            <SelectValue placeholder="Choose a platform" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="tiktok">TikTok</SelectItem>
                                        <SelectItem value="youtube">YouTube</SelectItem>
                                        <SelectItem value="instagram">Instagram</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="postUrl"
                        rules={{ required: "Post URL is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg'>Post URL</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder={getPlaceholderByPlatform(selectedPlatform)}
                                        {...field} 
                                        className='bg-secondary/20 h-12'
                                        disabled={!selectedPlatform}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition"
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