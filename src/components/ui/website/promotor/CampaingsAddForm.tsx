"use client";

import React, { useState, useMemo } from "react";
import { Check, ChevronRight, ArrowLeft, Upload, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "../../badge";

const steps = [
    { id: 1, name: "Basic Info", subtitle: "Campaign details" },
    { id: 2, name: "Budget & Rewards", subtitle: "Financial setup" },
    { id: 3, name: "Platforms & Content", subtitle: "Target platforms" },
    { id: 4, name: "Requirements", subtitle: "Guidelines & rules" },
    { id: 5, name: "Review", subtitle: "Final approval" },
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
        <div className="absolute z-1 top-10 left-1/2 -translate-1/2 w-4/5 border-2 border-dashed border-gray-5"></div>
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
                <div className="space-y-6 p-6 border rounded-xl bg-white mb-5">
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


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>
                <div className="flex justify-between gap-4 bg-white rounded-md shadow-md p-4">
                    <Button size="lg" variant="outline" disabled={!valid} className="bg-transparent rounded-full! text-black! border border-black/50!">
                        Previous
                    </Button>
                    <div className="flex items-center gap-3">
                        <Button size="lg" variant="outline" disabled={!valid} className="bg-transparent rounded-full! text-black! border border-black/50!">
                            Draft
                        </Button>

                        <Button type="submit" disabled={!valid}>
                            Next Step <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                </div>
            </form>
        </div>

    );
};

const Step2 = ({ formData, updateFormData, prev, next }: any) => {
    const valid = formData.totalCampaignBudget && formData.rewardAmount;

    return (
        <div className="">
            <p className="text-lg font-semibold mb-5">Campaign Budget & Rewards</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    valid && next();
                }}
            >
                <div className="space-y-6 p-6 border rounded-xl bg-white mb-5">
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

                <div className="flex justify-between gap-4 bg-white rounded-md shadow-md p-4">
                    <Button size="lg" variant="outline" disabled={!valid} className="bg-transparent rounded-full! text-black! border border-black/50!">
                        Previous
                    </Button>
                    <div className="flex items-center gap-3">
                        <Button size="lg" variant="outline" disabled={!valid} className="bg-transparent rounded-full! text-black! border border-black/50!">
                            Draft
                        </Button>

                        <Button type="submit" disabled={!valid}>
                            Next Step <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                </div>
            </form>
        </div>
    );
};

const Step3 = ({ formData, updateFormData, prev, next }: any) => {
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
        <div>
            {/* Platforms */}
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

            <div className="space-y-4">
                {contentTypes.map((c) => (
                    <div
                        key={c.value}
                        className="flex items-start justify-between border rounded-xl p-4 bg-white"
                    >
                        <div>
                            <p className="font-medium">{c.title}</p>
                            <p className="text-sm text-gray-500">{c.desc}</p>
                        </div>

                        <Checkbox
                            checked={formData.contentGuidelines?.includes(c.value)}
                            onCheckedChange={() =>
                                toggleArrayValue("contentGuidelines", c.value)
                            }
                        />
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between gap-4 bg-white rounded-md shadow-md p-4 mt-8">
                <Button
                    size="lg"
                    variant="outline"
                    onClick={prev}
                    className="rounded-full"
                >
                    Previous
                </Button>

                <div className="flex gap-3">
                    <Button size="lg" variant="outline" className="rounded-full">
                        Save as Draft
                    </Button>

                    <Button size="lg" disabled={!valid} onClick={next}>
                        Next Step
                    </Button>
                </div>
            </div>
        </div>
    );
};

const Step4 = ({ formData, updateFormData, prev, next }: any) => {

  const handleRequirementChange = (index: number, value: string) => {
    const updated = [...formData.campaignRequirements];
    updated[index] = value;
    updateFormData({ campaignRequirements: updated });
  };

  const addRequirement = () => {
    updateFormData({
      campaignRequirements: [...formData.campaignRequirements, ""],
    });
  };

  const valid =
    formData.campaignRequirements.some((r: string) => r.trim() !== "");

  return (
    <div>
      <p className="text-lg font-semibold mb-6">
        Campaign Requirements & Assets
      </p>

      {/* Requirements */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-medium">Campaign Requirements</p>
          <Button
            size="sm"
            onClick={addRequirement}
            className="rounded-full bg-orange-400 hover:bg-orange-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Requirement
          </Button>
        </div>

        {formData.campaignRequirements.map((req: string, idx: number) => (
          <Input
            key={idx}
            className="h-[45px] mb-3"
            placeholder={`Requirement ${idx + 1}`}
            value={req}
            onChange={(e) =>
              handleRequirementChange(idx, e.target.value)
            }
          />
        ))}

        {/* Guideline Suggestions */}
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4">
          <p className="font-medium text-orange-600 mb-2">
            Guidelines Suggestions
          </p>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>Specify minimum follower count or engagement rate</li>
            <li>Mention any content restrictions or brand guidelines</li>
            <li>Include hashtags or mentions required</li>
            <li>State video length requirements</li>
            <li>Specify if prior approval is needed before posting</li>
          </ul>
        </div>
      </div>

      {/* Assets */}
      <div className="bg-white border rounded-xl p-6 mb-6">
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

      {/* Footer */}
      <div className="flex justify-between gap-4 bg-white rounded-md shadow-md p-4">
        <Button
          size="lg"
          variant="outline"
          onClick={prev}
          className="rounded-full"
        >
          Previous
        </Button>

        <div className="flex gap-3">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full"
          >
            Save as Draft
          </Button>

          <Button
            size="lg"
            onClick={next}
            disabled={!valid}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
};

const Step5 = ({ formData, prev, submit }: any) => {
  return (
    <div className="">
      <p className="text-lg font-semibold mb-6">Review Your Campaign</p>

      <div className="space-y-6 bg-white p-5 rounded-xl">
        {/* Basic Information */}
        <div className="border rounded-xl p-6 bg-white">
          <p className="font-semibold mb-4">Basic Information</p>

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
          <p className="font-semibold mb-4">Budget & Rewards</p>

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
            variant="outline"
            className="rounded-full"
          >
            Save as Draft
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
    </div>
  );
};


const CampaingsAddForm = () => {
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

    const updateFormData = (field: any) =>
        setFormData((p) => ({ ...p, ...field }));

    const submit = () => {
        console.log("SUBMITTED DATA:", formData);
        alert("Submitted. Check console.");
    };

    const views: any = {
        1: <Step1 formData={formData} updateFormData={updateFormData} next={() => setStep(2)} />,
        2: <Step2 formData={formData} updateFormData={updateFormData} prev={() => setStep(1)} next={() => setStep(3)} />,
        3: <Step3 formData={formData} updateFormData={updateFormData} prev={() => setStep(2)} next={() => setStep(4)} />,
        4: <Step4 formData={formData} updateFormData={updateFormData} prev={() => setStep(3)} next={() => setStep(5)} />,
        5: <Step5 formData={formData} prev={() => setStep(4)} submit={submit} />,
    };

    return (
        <div className="w-full">
            <div className="mb-6 pt-10">
                <h1 className={`mb-2 text-3xl font-semibold`}>Create New Campaign</h1>
                <p className="textPara">Set up your music promotion campaign</p>
            </div>
            <Stepper currentStep={step} />
            <div className="mt-8">{views[step]}</div>
        </div>
    );
}


export default CampaingsAddForm;