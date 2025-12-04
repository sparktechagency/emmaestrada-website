"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Check, ChevronRight, ArrowLeft, Upload, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "../../badge";

const steps = [
  { id: 1, name: "Basic & Budget", subtitle: "Campaign details" },
  { id: 2, name: "Playform & Assets", subtitle: "Financial setup" },
  { id: 3, name: "Final Review", subtitle: "Target platforms" },
  // { id: 4, name: "Requirements", subtitle: "Guidelines & rules" },
  // { id: 5, name: "Review", subtitle: "Final approval" },
];

const platforms = [
  { label: "TikTok", value: "tiktok" },
  { label: "Instagram", value: "instagram" },
  { label: "YouTube", value: "youtube" },
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
      Drag & drop or <span className="text-orange-600 font-medium">Browse</span>
    </p>
    <p className="text-xs text-gray-400">MP3, WAV, AAC • Max 10MB</p>
    <input
      type="file"
      className="hidden"
      onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
    />
  </label>
);

const Step1 = ({ formData, updateFormData, next }: any) => {
  const valid = formData.campaignTitle && formData.campaignDescription;
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
              placeholder="Campaign Title"
              value={formData.campaignTitle}
              onChange={(e) => updateFormData({ campaignTitle: e.target.value })}
            />
          </div>
          <div className="">
            <p className="text-md  font-md font-semibold mb-2">Campaign Description</p>
            <Textarea
              placeholder="Campaign Description"
              value={formData.campaignDescription}
              onChange={(e) => updateFormData({ campaignDescription: e.target.value })}
            />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            <div className="">
              <p className="text-md  font-md font-semibold mb-2">Genre</p>
              <Input
                className="h-[45px]"
                placeholder="Genre"
                value={formData.genre}
                onChange={(e) => updateFormData({ genre: e.target.value })}
              />
            </div>
            <div className="">
              <p className="text-md  font-md font-semibold mb-2">Influencers needed</p>
              <Input
                className="h-[45px]"
                placeholder="Influencers Needed"
                type="number"
                value={formData.influencersNeeded}
                onChange={(e) => updateFormData({ influencersNeeded: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="">
              <p className="text-md  font-md font-semibold mb-2">Start Date</p>
              <Input
                className="h-[45px]"
                type="date"
                value={formData.startDate}
                onChange={(e) => updateFormData({ startDate: e.target.value })}
              />
            </div>

            <div className="">
              <p className="text-md  font-md font-semibold mb-2">End Date</p>
              <Input
                className="h-[45px]"
                type="date"
                value={formData.endDate}
                onChange={(e) => updateFormData({ endDate: e.target.value })}
              />
            </div>

          </div>
          <div className="">
            <p className="text-md  font-md font-semibold mb-2">Upload Audio Track *</p>
            <FileUpload onChange={(file) => updateFormData({ audioTrack: file })} />
          </div>
          <div className="mt-5">
            <p className="text-md  font-md font-semibold mb-2">Campaign Title</p>
            <Input
              className="h-[45px]"
              placeholder="Total Budget"
              value={formData.totalCampaignBudget}
              onChange={(e) => updateFormData({ totalCampaignBudget: e.target.value })}
            />
          </div>


          <div className="">
            <p className="text-md  font-md font-semibold mb-2">Reward Type</p>
            <Input
              className="h-[45px]"
              placeholder="Reward Type"
              value={formData.rewardType}
              onChange={(e) => updateFormData({ rewardType: e.target.value })}
            />
          </div>

          <div className="">
            <p className="text-md  font-md font-semibold mb-2">Reward Amount</p>
            <Input
              className="h-[45px]"
              placeholder="Reward Amount"
              value={formData.rewardAmount}
              onChange={(e) => updateFormData({ rewardAmount: e.target.value })}
            />
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

  const valid =
    formData.targetPlatform?.length > 0 &&
    formData.contentGuidelines?.length > 0;

  return (
    <div className="">
      <p className="text-lg font-semibold mb-5">Playform & Assets</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          valid && next();
        }}
      >
        <div className="space-y-6 p-2 md:p-6 border rounded-xl bg-white mb-5">
          <p className="text-lg font-semibold mb-4">Select Platforms *</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {platforms.map((p) => (
              <div
                key={p.value}
                className="flex items-center justify-between border rounded-xl p-4 bg-white"
              >
                <p className="font-medium">{p.label}</p>
                <Checkbox
                  checked={formData.targetPlatform?.includes(p.value)}
                  onCheckedChange={() =>
                    toggleArrayValue("targetPlatform", p.value)
                  }
                />
              </div>
            ))}
          </div>

          {/* Content Types */}
          <p className="text-lg font-semibold mb-4">Allowed Content Type</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 ">
            {contentTypes.map((c) => (
              <div
                key={c.value}
                className="last:col-span-2 md:last:col-span-1 flex items-start justify-between border rounded-xl p-4 bg-white"
              >
                <div>
                  <p className="font-medium text-sm md:text-md">{c.title}</p>
                  <p className="text-xs md:text-sm text-gray-500 text-wrap">{c.desc}</p>
                </div>
                <div className="w-5 ">
                  <Checkbox
                    className=""
                    checked={formData.contentGuidelines?.includes(c.value)}
                    onCheckedChange={() =>
                      toggleArrayValue("contentGuidelines", c.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Assets */}
          <div className="bg-white border rounded-xl p-3 md:p-6 mb-6">
            <p className="font-medium mb-3">Campaign Assets</p>
            <Input
              className="h-[45px]"
              placeholder="Paste asset link (Drive, Dropbox, etc.)"
              value={formData.campaignAssets}
              onChange={(e) =>
                updateFormData({ campaignAssets: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 bg-white rounded-md shadow-md p-4">
          <Button onClick={prev} size="lg" variant="outline" disabled={!valid} className="bg-transparent rounded-full! text-black! border border-black/50!">
            Previous
          </Button>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={!valid}>
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
    <div className="">
      <p className="text-lg font-semibold mb-6">Review & Submit</p>

      <div className="space-y-6 bg-whitemd:p-5 rounded-xl">
        {/* Basic Information */}
        <div className="border rounded-xl p-4 md:p-6 bg-white">
          <p className="font-semibold mb-4">Basic & Budget</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Campaign Title</p>
              <p className="font-medium">
                {formData.campaignTitle || "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Genre</p>
              <p className="font-medium">
                {formData.genre || "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">
                {formData.startDate || "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-medium">
                {formData.endDate || "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Influencers Needed
              </p>
              <p className="font-medium">
                {formData.influencersNeeded || "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Audio File</p>
              <p className="font-medium">
                {formData.audioTrack
                  ? "Uploaded"
                  : "Not uploaded"}
              </p>
            </div>
          </div>
        </div>

        {/* Budget & Rewards */}
        <div className="border rounded-xl p-6 bg-white">
          <p className="font-semibold mb-4">Platform & Assets</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="font-medium">
                ${formData.totalCampaignBudget || 0}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Reward Type</p>
              <p className="font-medium">
                {formData.rewardType || "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Reward Amount
              </p>
              <p className="font-medium">
                ${formData.rewardAmount || 0}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Payout Range
              </p>
              <p className="font-medium">
                {formData.minimumPayout &&
                  formData.maximumPayout
                  ? `$${formData.minimumPayout} - $${formData.maximumPayout}`
                  : "Not set"}
              </p>
            </div>
          </div>
        </div>

        {/* Platforms & Content */}
        <div className="border rounded-xl p-6 bg-white">
          <p className="font-semibold mb-4">
            Platforms & Content
          </p>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">
              Selected Platforms
            </p>

            {formData.targetPlatform?.length ? (
              <div className="flex flex-wrap gap-2">
                {formData.targetPlatform.map((p: string) => (
                  <Badge key={p} variant="outline">
                    {p}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="font-medium">
                No platforms selected
              </p>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">
              Content Types
            </p>

            {formData.contentGuidelines?.length ? (
              <div className="flex flex-wrap gap-2">
                {formData.contentGuidelines.map(
                  (c: string) => (
                    <Badge key={c} variant="secondary">
                      {c}
                    </Badge>
                  )
                )}
              </div>
            ) : (
              <p className="font-medium">Not set</p>
            )}
          </div>
        </div>

        {/* Requirements */}
        <div className="border rounded-xl p-6 bg-white">
          <p className="font-semibold mb-3">Requirements</p>

          {formData.campaignRequirements?.some(
            (r: string) => r.trim() !== ""
          ) ? (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {formData.campaignRequirements.map(
                (req: string, idx: number) =>
                  req && <li key={idx}>{req}</li>
              )}
            </ul>
          ) : (
            <p className="text-gray-500">
              No requirements added
            </p>
          )}
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

        <div className="flex gap-3">
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600"
            onClick={submit}
          >
            Submit Campaign
          </Button>
        </div>
      </div>
    </div>
  );
};





export default CampaingsAddForm;