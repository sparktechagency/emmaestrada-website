"use client";

import React, { useState, useEffect } from "react";
import { Check, ChevronRight, Loader, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { imageUrl } from "@/constants";
import { revalidate } from "@/helpers/revalidateHelper";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
const steps = [
  { id: 1, name: "Basic & Budget", subtitle: "Campaign details" },
  { id: 2, name: "Platform & Assets", subtitle: "Financial setup" },
  { id: 3, name: "Final Review", subtitle: "Target platforms" },
];

const platforms = [
  { label: "TikTok", value: "TikTok", icon: "/tiktokBlack.png" },
  { label: "Instagram", value: "Instagram", icon: "/instagram.png" },
  { label: "YouTube", value: "YouTube", icon: "/youtube.png" },
];

const initialState = {
    title: "",
    contentType: "UGC",
    categoryId: "",
    genreId: "",
    trackTitle: "",
    artistName: "",
    thumbnail: null as File | null,
    budget: {
      rewardRate: "",
      perViews: "",
      minPayout: "",
      maxPayout: "",
      flatPrice: "",
    },
    campaignAmount: "",
    platforms: [] as string[],
    assets: {
      availableContentLink: "",
      instagram_audio_link: "",
      tiktok_audio_link: "",
      contentRequirement: "",
    },
  }

const CampaignsAddForm = ({ editData, onClose }: { editData?: any, onClose?: any }) => {
  const [step, setStep] = useState(1);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState([])
  const [genries, setGenries] = useState([])
  const route = useRouter()
  const [loading, setLoading] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const [formData, setFormData] = useState(initialState);


  const fetchingCategories = async () => {
    try {
      const category = await myFetch('/categories?type=CATEGORY');
      setCategories(category?.data)
      setFormData((prev) => ({ ...prev, categoryId: category?.data?.[0]?._id }));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const fetchingGenries = async () => {
    try {
      const category = await myFetch('/categories?type=GENRE');
      setGenries(category?.data)
      setFormData((prev) => ({ ...prev, genreId: category?.data?.[0]?._id }));
    } catch (error) {
      console.error('Error:', error);
    }
  }



  useEffect(() => {
    fetchingCategories()
    fetchingGenries()
  }, [])


  useEffect(() => {
    if (editData) {
      setFormData(prev => ({
        ...prev,
        ...editData,
        categoryId: editData.categoryId,
        genreId: editData.genreId,
        assets: {
          ...prev.assets,
          ...editData.assets,
          contentRequirement: editData?.assets?.contentRequirement[0] || "",
        },
      }));
      setStep(1);
    }
  }, [editData]);

  const updateFormData = (field: any) =>
    setFormData((p) => ({ ...p, ...field }));

  const updateBudget = (field: any) =>
    setFormData((p) => ({ ...p, budget: { ...p.budget, ...field } }));

  const updateAssets = (field: any) =>
    setFormData((p) => ({ ...p, assets: { ...p.assets, ...field } }));

  const handleThumbnailUpload = (file: File) => {
    updateFormData({ thumbnail: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeThumbnail = () => {
    updateFormData({ thumbnail: null });
    setThumbnailPreview(null);
  };

  const submit = async () => {
    setLoading(true);
    const submitFormData = new FormData();

    const payload = {
      title: formData.title,
      contentType: formData.contentType,
      categoryId: formData.categoryId,
      genreId: formData.genreId,
      trackTitle: formData.trackTitle,
      artistName: formData.artistName,
      budget: {
        rewardRate: Number(formData.budget.rewardRate),
        perViews: Number(formData.budget.perViews),
        minPayout: Number(formData.budget.minPayout),
        maxPayout: Number(formData.budget.maxPayout),
        flatPrice: Number(formData.budget.flatPrice),
      },
      campaignAmount: Number(formData.campaignAmount),
      platforms: formData.platforms,
      assets: {
        availableContentLink: formData.assets.availableContentLink,
        instagram_audio_link: formData.assets.instagram_audio_link,
        tiktok_audio_link: formData.assets.tiktok_audio_link,
        contentRequirement: [formData.assets.contentRequirement],
      },
    };

    if (
      formData.thumbnail &&
      typeof formData.thumbnail !== "string" &&
      formData.thumbnail instanceof File
    ) {
      submitFormData.append("thumbnail", formData.thumbnail);
    }

    submitFormData.append("data", JSON.stringify(payload));


    if (editData) {
      try {
        const response = await myFetch(`/campaigns/update/${editData._id}`, {
          method: 'PATCH',
          body: submitFormData
        });

        if (response?.success) {
          revalidate("promotor-campaigns")
          onClose()
          toast.success(response?.message)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error:', error);
        onClose()
        setLoading(false)
      }
    } else {
      try {
        const response = await myFetch('/campaigns/create', {
          method: 'POST',
          body: submitFormData,
        });

        if (response?.success) {
          revalidate("promotor-campaigns")                    
          route.push("/promotor?status=upcoming")

          setTimeout(() => {
            setShowFlash(true)
          }, 2000)
          setShowFlash(false)
          setLoading(false)
        } else {
          toast.error(response?.message)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false)
      }
    }

  };

  const views: any = {
    1: (
      <Step1
        formData={formData}
        editData={editData}
        updateFormData={updateFormData}
        updateBudget={updateBudget}
        categories={categories}
        genries={genries}
        thumbnailPreview={thumbnailPreview}
        handleThumbnailUpload={handleThumbnailUpload}
        removeThumbnail={removeThumbnail}
        next={() => setStep(2)}
      />
    ),
    2: (
      <Step2
        formData={formData}
        updateFormData={updateFormData}
        updateAssets={updateAssets}
        prev={() => setStep(1)}
        next={() => setStep(3)}
      />
    ),
    3: (
      <Step3
        formData={formData}
        thumbnailPreview={thumbnailPreview}
        submit={submit}
        prev={() => setStep(2)}
        loading={loading}
      />
    ),
  };

  return (
    <div className="w-full">
      <div className="mb-6 pt-10">
        <h1 className="mb-2 text-2xl md:text-3xl font-semibold">
          Create New Campaign
        </h1>
        <p className="text-md text-slate-500 md:text-xl">
          Set up your music promotion campaign
        </p>
      </div>
      <Stepper currentStep={step} />
      {showFlash && <FlashMessage open={showFlash} setOpen={setShowFlash} />}
      <div className="mt-8">{views[step]}</div>
    </div>
  );
};


// Flash Message UI component
const FlashMessage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="max-w-md rounded-xl">       
        <DialogHeader>
          <DialogTitle className="text-green-600">
            Campaign Created Successfully
          </DialogTitle>

          <DialogDescription className="text-sm text-red-600 mt-2">
            The campaign will become active once you have added budget to campaign!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};


const Stepper = ({ currentStep }: { currentStep: number }) => (
  <div className="relative w-full flex justify-between items-start md:items-center bg-white shadow-lg py-5 rounded-lg px-4">
    {steps?.map((step) => (
      <div key={step.id} className="z-10 flex flex-col items-center w-full">
        <div
          className={`h-10 w-10 flex items-center justify-center rounded-full text-white text-sm font-semibold
          ${step.id === currentStep
              ? "bg-orange-500 ring-4 ring-orange-200"
              : step.id < currentStep
                ? "bg-orange-500"
                : "bg-gray-300"
            }`}
        >
          {step.id < currentStep ? <Check className="h-5 w-5" /> : step.id}
        </div>
        <p
          className={`mt-2 text-[10px] md:text-lg font-medium ${step.id === currentStep ? "text-orange-600" : "text-gray-500"
            }`}
        >
          {step.name}
        </p>
        <p className="hidden md:block text-[10px] md:text-[12px] text-gray-400">
          {step.subtitle}
        </p>
      </div>
    ))}
    <div className="absolute z-0 top-10 left-1/2 -translate-x-1/2 w-[70%] border-2 border-dashed border-gray-300"></div>
  </div>
);

const FileUpload = ({
  onChange,
  preview,
  onRemove,
}: {
  onChange: (file: File) => void;
  preview: string | null;
  onRemove: () => void;
}) => {
  if (preview) {
    return (
      <div className="relative h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
        <img
          src={preview}
          alt="Thumbnail preview"
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
      <Upload className="h-6 w-6 text-gray-400" />
      <p className="mt-2 text-sm text-gray-500">
        <span className="text-orange-600 font-medium">Upload thumbnail</span>
      </p>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
      />
    </label>
  );
};

const Step1 = ({
  formData,
  editData,
  updateFormData,
  updateBudget,
  thumbnailPreview,
  categories,
  genries,
  handleThumbnailUpload,
  removeThumbnail,
  next,
}: any) => {

  const handleNext = () => {
    next();
  };

  return (
    <div>
      <p className="text-lg font-semibold mb-5">Campaign Basic Information</p>

      <div className="space-y-6 p-3 md:p-6 border rounded-xl bg-white mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          <div className="">
            <p className="text-md font-md font-semibold mb-2">Campaign Title</p>
            <Input
              className="h-[45px]"
              placeholder="Campaign Title"
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Content Type</label>
            <select
              className="mt-2 w-full h-12 border rounded-xl px-3"
              value={formData.contentType}
              onChange={(e) =>
                updateFormData({ contentType: e.target.value })
              }
            >
              <option value="UGC">UGC</option>
              <option value="Clipping">Clipping</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">

          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              className="mt-2 w-full h-12 border rounded-xl px-3"
              value={formData.categoryId}
              onChange={(e) =>
                updateFormData({ categoryId: e.target.value })
              }
            >
              {categories?.map((c: any) => <option key={c?._id} value={c?._id}>{c?.name}</option>)}

            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Genre</label>
            <select
              className="mt-2 w-full h-12 border rounded-xl px-3"
              value={formData.genreId}
              onChange={(e) =>
                updateFormData({ genreId: e.target.value })
              }
            >
              <option value="">Select</option>
              {genries?.map((g: any) => <option key={g?._id} value={g?._id}>{g?.name}</option>)}
            </select>
          </div>
        </div>



        {editData && typeof formData?.thumbnail === "string" ? <div>
          <p className="text-md text-slate-400 font-md font-medium mb-2">
            Campaign Thumbnail
          </p>
          <div className="relative">
          <img src={`${imageUrl}${formData?.thumbnail}`} className="aspect-3/2 w-full h-full object-cover rounded-xl" alt="Thumbnail"/>
            <div className="w-10-h-10 border rounded-full">
              <X className="h-5 w-5 text-white cursor-pointer absolute top-2 right-2 bg-red-500 p-1 rounded-full" onClick={removeThumbnail} />
            </div>
          </div>
        </div> :
          <div>
            <p className="text-md text-slate-400 font-md font-medium mb-2">
              Campaign Thumbnail
            </p>
            <FileUpload
              onChange={handleThumbnailUpload}
              preview={thumbnailPreview}
              onRemove={removeThumbnail}
            />
          </div>}


        <div>
          <p className="text-md font-md font-semibold mb-2">
            Campaign Amount ($)
          </p>
          <Input
            className="h-[45px]"
            type="number"
            placeholder="1000"
            min="0"
            value={formData.campaignAmount}
            onChange={(e) =>
              updateFormData({ campaignAmount: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <div className="w-full">
              <p className="text-md font-md font-semibold mb-2">
                Reward Rate ($)
              </p>
              <Input
                className="h-[45px]"
                type="number"
                placeholder="8"
                min="0"
                value={formData.budget.rewardRate}
                onChange={(e) => updateBudget({ rewardRate: e.target.value })}
              />
            </div>
            <div className="w-full">
              <p className="text-md font-md font-semibold mb-2">Per Views</p>
              <Input
                className="h-[45px]"
                type="number"
                placeholder="1000"
                min="0"
                value={formData.budget.perViews}
                onChange={(e) => updateBudget({ perViews: e.target.value })}
              />
            </div>
          </div>

          <div className="w-full">
            <p className="text-md font-md font-semibold mb-2">
              Flat Fee ($)
            </p>
            <Input
              className="h-[45px]"
              type="number"
              placeholder="10 (Max 200)"
              min="0"
              max="200"
              value={formData.budget.flatPrice}
              onChange={(e) => updateBudget({ flatPrice: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-md font-md font-semibold mb-2">
              Minimum Payout ($)
            </p>
            <Input
              className="h-[45px]"
              type="number"
              placeholder="20"
              min="0"
              value={formData.budget.minPayout}
              onChange={(e) => updateBudget({ minPayout: e.target.value })}
            />
          </div>

          <div>
            <p className="text-md font-md font-semibold mb-2">
              Maximum Payout ($)
            </p>
            <Input
              className="h-[45px]"
              type="number"
              placeholder="100"
              min="0"
              value={formData.budget.maxPayout}
              onChange={(e) => updateBudget({ maxPayout: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 bg-white rounded-md shadow-md p-4">
        <Button onClick={handleNext}>
          Next Step <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const Step2 = ({
  formData,
  updateFormData,
  updateAssets,
  prev,
  next,
}: any) => {
  const togglePlatform = (value: string) => {
    const exists = formData.platforms?.includes(value);
    updateFormData({
      platforms: exists
        ? formData.platforms.filter((v: string) => v !== value)
        : [...formData.platforms, value],
    });
  };

  return (
    <div>
      <p className="text-lg font-semibold mb-5">Platform & Assets</p>

      <div className="space-y-6 p-2 md:p-6 border rounded-xl bg-white mb-5">
        <p className="text-lg font-semibold mb-4">Select Platforms *</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {platforms.map((p) => (
            <div
              key={p.value}
              className="flex items-center justify-between border rounded-xl p-4 bg-white"
            >
              <div className="flex items-center gap-2">
                <Image src={p.icon} height={20} width={20} alt="logo" />
                <p className="font-medium">{p.label}</p>
              </div>
              <Checkbox
                checked={formData.platforms?.includes(p.value)}
                onCheckedChange={() => togglePlatform(p.value)}
              />
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-xl p-3 md:p-6 mb-6">
          <p className="text-lg font-semibold ">Select Platforms *</p>
          <div className="flex items-center gap-5">
            <div className="w-full">
              <p className="text-md  mb-2">Tiktok</p>
              <Input
                className="h-[45px] placeholder:text-xs!"
                placeholder="https://www.tiktok.com/music/AWGAZI-7573972001669433360"
                value={formData.assets.tiktok_audio_link}
                disabled={!formData.platforms.includes('TikTok')}
                onChange={(e) =>
                  updateAssets({ tiktok_audio_link: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <p className="text-md  mb-2">Instagram</p>
              <Input
                className="h-[45px] placeholder:text-xs!"
                placeholder="https://www.instagram.com/reels/audio/1369317098161453"
                value={formData.assets.instagram_audio_link}
                disabled={!formData.platforms.includes('Instagram')}
                onChange={(e) =>
                  updateAssets({ instagram_audio_link: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-3 md:p-6 mb-6">
          <p className="text-lg font-semibold ">Track Informatiom</p>
          <div className="flex items-center gap-5">
            <div className="w-full">
              <p className="text-md mb-2">Title</p>
              <Input
                className="h-[45px]"
                placeholder="Title of the track"
                value={formData.trackTitle}
                onChange={(e) =>
                  updateFormData({ trackTitle: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <p className="text-md mb-2">Artist</p>
              <Input
                className="h-[45px]"
                placeholder="Name of the artist"
                value={formData.artistName}
                onChange={(e) =>
                  updateFormData({ artistName: e.target.value })
                }
              />
            </div>
          </div>
        </div>


        <div className="bg-white border rounded-xl p-3 md:p-6 mb-6">
          <p className="font-medium mb-1">Available Content Link</p>
          <p className="text-sm text-gray-500 mb-3">
            We recommend you add guides and raw footage here
          </p>
          <Input
            className="h-[45px]"
            placeholder="https://drive.google.com/drive/folder/123456789"
            value={formData.assets.availableContentLink}
            onChange={(e) =>
              updateAssets({ availableContentLink: e.target.value })
            }
          />
        </div>

        <p className="font-medium mb-1">Content Requirement</p>
        <div className="bg-white border rounded-xl p-4 mb-6">
          <textarea
            className="h-[120px] w-full"
            placeholder="Content Requirement"
            value={formData.assets.contentRequirement}
            onChange={(e) =>
              updateAssets({ contentRequirement: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex justify-between gap-4 bg-white rounded-md shadow-md p-4">
        <Button
          onClick={prev}
          size="lg"
          variant="outline"
          className="border-gray-300"
        >
          Previous
        </Button>
        <Button onClick={next}>
          Next Step <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const Step3 = ({ formData, thumbnailPreview, prev, submit, loading }: any) => {
  const { budget = {}, assets = {} } = formData;

  return (
    <div>
      <p className="text-lg font-semibold mb-6">Review & Submit</p>

      <div className="space-y-6">
        {/* Campaign Information */}
        <div className="border rounded-xl p-4 md:p-6 bg-white">
          <p className="font-semibold mb-4">Campaign Information</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Campaign Title</p>
              <p className="font-medium">{formData.title || "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Content Type</p>
              <p className="font-medium">{formData.contentType || "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Category ID</p>
              <p className="font-medium">{formData.categoryId || "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Genre ID</p>
              <p className="font-medium">{formData.genreId || "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Track Title</p>
              <p className="font-medium">{formData.trackTitle || "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Artist Name</p>
              <p className="font-medium">{formData.artistName || "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Campaign Amount</p>
              <p className="font-medium">
                {formData.campaignAmount
                  ? `$${formData.campaignAmount}`
                  : "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Thumbnail</p>
              <p className="font-medium">
                {thumbnailPreview ? "Uploaded" : "Not uploaded"}
              </p>
            </div>
          </div>

          {thumbnailPreview && (
            <div className="mt-4">
              <img
                src={thumbnailPreview}
                alt="Campaign thumbnail"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Budget & Rewards */}
        <div className="border rounded-xl p-4 md:p-6 bg-white">
          <p className="font-semibold mb-4">Budget & Rewards</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Reward Rate</p>
              <p className="font-medium">
                {budget.rewardRate
                  ? `$${budget.rewardRate} per ${budget.perViews || "—"} views`
                  : "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Flat Price</p>
              <p className="font-medium">
                {budget.flatPrice ? `$${budget.flatPrice}` : "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Minimum Payout</p>
              <p className="font-medium">
                {budget.minPayout ? `$${budget.minPayout}` : "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Maximum Payout</p>
              <p className="font-medium">
                {budget.maxPayout ? `$${budget.maxPayout}` : "Not set"}
              </p>
            </div>
          </div>
        </div>

        {/* Target Platforms */}
        <div className="border rounded-xl p-4 md:p-6 bg-white">
          <p className="font-semibold mb-4">Target Platforms</p>

          {formData.platforms?.length ? (
            <div className="flex flex-wrap gap-2">
              {formData.platforms.map((p: string) => (
                <Badge key={p} variant="outline">
                  {p}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No platform selected</p>
          )}
        </div>

        {/* Campaign Assets */}
        <div className="border rounded-xl p-4 md:p-6 bg-white">
          <p className="font-semibold mb-4">Campaign Assets</p>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500">Available Content Link</p>
              <p className="break-all">
                {assets.availableContentLink || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Instagram Audio Link</p>
              <p className="break-all">
                {assets.instagram_audio_link || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">TikTok Audio Link</p>
              <p className="break-all">
                {assets.tiktok_audio_link || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Content Requirement</p>
              <p>
                {assets.contentRequirement || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between bg-white p-4 mt-8 rounded-md shadow-md">
        <Button disabled={loading} size="lg" variant="outline" onClick={prev}>
          Previous
        </Button>

        <Button
          disabled={loading}
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
          onClick={submit}
        >
          {loading && <Loader className="h-4 w-4 animate-spin" />}
          {loading ? "Submitting..." : "Submit Campaign"}
        </Button>
      </div>
    </div>
  );
};


export default CampaignsAddForm;