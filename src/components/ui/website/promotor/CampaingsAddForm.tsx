"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Check, ChevronRight, ArrowLeft, Upload, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "../../badge";
import Image from "next/image";


const steps = [
  { id: 1, name: "Basic & Budget", subtitle: "Campaign details" },
  { id: 2, name: "Playform & Assets", subtitle: "Financial setup" },
  { id: 3, name: "Final Review", subtitle: "Target platforms" },
  // { id: 4, name: "Requirements", subtitle: "Guidelines & rules" },
  // { id: 5, name: "Review", subtitle: "Final approval" },
];

const platforms = [
  { label: "TikTok", value: "tiktok", icon: "/tiktokBlack.png" },
  { label: "Instagram", value: "instagram", icon: "/instagram.png" },
  { label: "X", value: "x", icon: "/X.png" },
  { label: "YouTube", value: "youtube", icon: "/youtube.png" },
];

const contentTypes = [
  {
    title: "Audio Clipping",
    desc: "Short clips with your audio",
    value: "audio_clipping",
  },
  {
    title: "Dance Videos",
    desc: "Choreographed dance content",
    value: "dance",
  },
  {
    title: "Lip Sync",
    desc: "Lip sync performances",
    value: "lip_sync",
  },
  {
    title: "Challenge",
    desc: "Viral challenge format",
    value: "challenge",
  },
  {
    title: "Music Review",
    desc: "Review/reaction content",
    value: "music_review",
  },
];

const CampaingsAddForm = ({ editData }: { editData?: any }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    campaignTitle: "",
    campaignDescription: "",
    genre: "",
    influencersNeeded: "",
    startDate: "",
    endDate: "",
    audioTrack: null,
    totalCampaignBudget: "",
    rewardType: "",
    rewardAmount: "",
    perViews: "",
    minimumPayout: "",
    maximumPayout: "",
    targetPlatform: [],
    contentGuidelines: [],
    ageRestriction: "",
    location: "",
    campaignRequirements: [""],
    campaignAssets: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({ ...formData, ...editData });
      setStep(1); // optional: always start at step 1 when editing
    }
  }, [editData]);

  const updateFormData = (field: any) =>
    setFormData((p) => ({ ...p, ...field }));

  const submit = () => {
    console.log("SUBMITTED DATA:", formData);
    alert("Submitted. Check console.");
  };

  const views: any = {
    1: <Step1 formData={formData} updateFormData={updateFormData} next={() => setStep(2)} />,
    2: <Step2 formData={formData} updateFormData={updateFormData} prev={() => setStep(1)} next={() => setStep(3)} />,
    3: <Step3 formData={formData} updateFormData={updateFormData} submit={submit} prev={() => setStep(2)} />
  };

  return (
    <div className="w-full">
      <div className="mb-6 pt-10">
        <h1 className={`mb-2 text-2xl md:text-3xl font-semibold`}>Create New Campaign</h1>
        <p className="text-md text-slate-500 md:text-xl">Set up your music promotion campaign</p>
      </div>
      <Stepper currentStep={step} />
      <div className="mt-8">{views[step]}</div>
    </div>
  );
}


const Stepper = ({ currentStep }: { currentStep: number }) => (
  <div className="relative w-full flex justify-between items-start md:items-center bg-white shadow-lg py-5 rounded-lg">
    {steps?.map((step) => (
      <div key={step.id} className="z-10 flex flex-col items-center w-full ">
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
        <p className="hidden md:block text-[10px] md:text-[12px] text-gray-400">{step.subtitle}</p>
      </div>
    ))}
    <div className="absolute z-1 top-10 left-1/2 -translate-1/2 w-[70%] border-2 border-dashed border-gray-5"></div>
  </div>
);

const FileUpload = ({ onChange }: { onChange: (file: File) => void }) => (
  <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
    <Upload className="h-6 w-6 text-gray-400" />
    <p className="mt-2 text-sm text-gray-500">
      <span className="text-orange-600 font-medium">Upload thumbnail</span>
    </p>
    <input
      type="file"
      className="hidden"
      onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
    />
  </label>
);

const Step1 = ({ formData, updateFormData, next }: any) => {
  // const valid = formData.campaignTitle && formData.campaignDescription;
  const valid = true;
  return (
    <div className=" ">
      <p className="text-lg font-semibold mb-5">Campaign Basic Information</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          valid && next();
        }}

      >
        <div className="space-y-6  p-3 md:p-6 border rounded-xl bg-white mb-5">
          <div className=" mt-5">
            <p className="text-md  font-md font-semibold mb-2">Campaign Title</p>
            <Input
              className="h-[45px]"
              placeholder="Fanatics UGC -$3 per 1,000 views"
              value={formData.campaignTitle}
              onChange={(e) => updateFormData({ campaignTitle: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            <div>
              <label className="text-sm font-medium">Content Type</label>
              <select className="mt-2 w-full h-12 border rounded-xl px-3">
                <option>UGC</option>
                <option>Clipping</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <select className="mt-2 w-full h-12 border rounded-xl px-3">
                <option>Personal  brand</option>
              </select>
            </div>
          </div>

          <div className="">
            <p className="text-md text-slate-400  font-md font-medium mb-2">Fanatics UGC -$3 per 1,000 views</p>
            <FileUpload onChange={(file) => updateFormData({ audioTrack: file })} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="">
              <p className="text-md  font-md font-semibold mb-2">Campaign budget</p>
              <Input
                className="h-[45px]"
                placeholder="Reward Type"
                value={formData.rewardType}
                onChange={(e) => updateFormData({ rewardType: e.target.value })}
              />
            </div>

            <div className="flex gap-3">
              <div className="w-full">
              <p className="text-md  font-md font-semibold mb-2">Reward Amount ($)</p>
              <Input
                className="h-[45px] mr w-full"
                placeholder="Reward Rate"
                value={formData.rewardAmount}
                onChange={(e) => updateFormData({ rewardAmount: e.target.value })}
              />              
              </div>
              <div className="w-full">
              <p className="text-md  font-md font-semibold mb-2">Per Views</p>
              <Input
                className="h-[45px] mr w-full"
                placeholder="1000"
                value={formData.perViews}
                onChange={(e) => updateFormData({ perViews: e.target.value })}
              />              
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="">
              <p className="text-md  font-md font-semibold mb-2">Minimum Payout</p>
              <Input
                className="h-[45px]"
                placeholder="Minimum Payout"
                value={formData.minimumPayout}
                onChange={(e) => updateFormData({ minimumPayout: e.target.value })}
              />
            </div>

            <div className="">
              <p className="text-md  font-md font-semibold mb-2">Maximum Payout</p>
              <Input
                className="h-[45px]"
                placeholder="Maximum Payout"
                value={formData.maximumPayout}
                onChange={(e) => updateFormData({ maximumPayout: e.target.value })}
              />
            </div>

          </div>
        </div>
        <div className="flex justify-end gap-4 bg-white rounded-md shadow-md p-4">
          <Button type="submit" disabled={!valid}>
            Next Step <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

      </form>
    </div>

  );
};

const Step2 = ({ formData, updateFormData, prev, next }: any) => {


  const toggleArrayValue = (key: string, value: string) => {
    const exists = formData[key]?.includes(value);

    updateFormData({
      [key]: exists
        ? formData[key].filter((v: string) => v !== value)
        : [...(formData[key] || []), value],
    });
  };

  return (
    <div className="">
      <p className="text-lg font-semibold mb-5">Playform & Assets</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
           next();
        }}
      >
        <div className="space-y-6 p-2 md:p-6 border rounded-xl bg-white mb-5">
          <p className="text-lg font-semibold mb-4">Select Platforms *</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {platforms.map((p) => (
              <div
                key={p.value}
                className="flex items-center justify-between border rounded-xl p-4 bg-white"
              > <div className="flex items-center gap-2">
                <Image src={p.icon} height={20} width={20} alt="logo" />
                <p className="font-medium">{p.label}</p>
              </div>
                <Checkbox
                  checked={formData.targetPlatform?.includes(p.value)}
                  onCheckedChange={() =>
                    toggleArrayValue("targetPlatform", p.value)
                  }
                />
              </div>
            ))}
          </div>

          {/* Assets */}
          <div className="bg-white border rounded-xl p-3 md:p-6 mb-6">
            <p className="font-medium mb-1">Available content</p>
            <p className="text-sm text-gray-500 mb-1">We recommend you add guides and raw footage here</p>
            <Input
              className="h-[45px]"
              placeholder="https://drive.google.com/drive/folder/123456789"
              value={formData.campaignAssets}
              onChange={(e) =>
                updateFormData({ campaignAssets: e.target.value })
              }
            />
          </div>
          {/* Assets */}
          <div className="bg-white border rounded-xl p-3 md:p-6 mb-6">
            <p className="font-medium mb-1">Content requirement</p>
            <p className="text-sm text-gray-500 mb-1">Add content guidelines for users to follow</p>
            <Input
              className="h-[45px]"
              placeholder="Must tag @whop in the description"
              value={formData.campaignAssets}
              onChange={(e) =>
                updateFormData({ campaignAssets: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 bg-white rounded-md shadow-md p-4">
          <Button onClick={prev} size="lg" variant="outline"  className="bg-transparent rounded-full! text-black! border border-black/50!">
            Previous
          </Button>
          <div className="flex items-center gap-3">
            <Button type="submit" >
              Next Step <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

        </div>

      </form>
    </div>
  );
};

const Step3 = ({ formData, prev, submit }: any) => {
  return (
    <div>
      <p className="text-lg font-semibold mb-6">Review & Submit</p>

      <div className="space-y-6">

        {/* Basic Information */}
        <div className="border rounded-xl p-4 md:p-6 bg-white">
          <p className="font-semibold mb-4">Campaign Information</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Campaign Title</p>
              <p className="font-medium">
                {formData.campaignTitle || "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">
                {formData.startDate && formData.endDate
                  ? `${formData.startDate} → ${formData.endDate}`
                  : "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Audio Track</p>
              <p className="font-medium">
                {formData.audioTrack ? "Uploaded" : "Not uploaded"}
              </p>
            </div>
          </div>
        </div>

        {/* Budget & Rewards */}
        <div className="border rounded-xl p-4 md:p-6 bg-white">
          <p className="font-semibold mb-4">Budget & Rewards</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Reward Type</p>
              <p className="font-medium">
                {formData.rewardType || "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Reward Amount</p>
              <p className="font-medium">
                ${formData.rewardAmount || 0} per {formData.perViews || "—"} views
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Minimum Payout</p>
              <p className="font-medium">
                ${formData.minimumPayout || "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Maximum Payout</p>
              <p className="font-medium">
                ${formData.maximumPayout || "Not set"}
              </p>
            </div>
          </div>
        </div>

        {/* Platforms */}
        <div className="border rounded-xl p-4 md:p-6 bg-white">
          <p className="font-semibold mb-4">Target Platforms</p>

          {formData.targetPlatform?.length ? (
            <div className="flex flex-wrap gap-2">
              {formData.targetPlatform.map((p: string) => (
                <Badge key={p} variant="outline">
                  {p}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No platform selected</p>
          )}
        </div>

        {/* Assets */}
        <div className="border rounded-xl p-4 md:p-6 bg-white">
          <p className="font-semibold mb-2">Campaign Assets</p>
          <p className="text-sm text-gray-500 break-all">
            {formData.campaignAssets || "No assets link provided"}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between bg-white p-4 mt-8 rounded-md shadow-md">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full"
          onClick={prev}
        >
          Previous
        </Button>

        <Button
          size="lg"
          className="bg-orange-500 hover:bg-orange-600"
          onClick={submit}
        >
          Submit Campaign
        </Button>
      </div>
    </div>
  );
};






export default CampaingsAddForm;