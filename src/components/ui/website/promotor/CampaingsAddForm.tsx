"use client";

import React, { useState, useMemo } from "react";
import { Check, ChevronRight, ArrowLeft, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const steps = [
    { id: 1, name: "Basic Info", subtitle: "Campaign details" },
    { id: 2, name: "Budget & Rewards", subtitle: "Financial setup" },
    { id: 3, name: "Platforms & Content", subtitle: "Target platforms" },
    { id: 4, name: "Requirements", subtitle: "Guidelines & rules" },
    { id: 5, name: "Review", subtitle: "Final approval" },
];

const Stepper = ({ currentStep }: { currentStep: number }) => (
    <div className="w-full flex justify-between items-center">
        {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center w-full">
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
                    className={`mt-2 text-xs font-medium ${step.id === currentStep ? "text-orange-600" : "text-gray-500"
                        }`}
                >
                    {step.name}
                </p>
                <p className="text-[10px] text-gray-400">{step.subtitle}</p>
            </div>
        ))}
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
        <form
            onSubmit={(e) => {
                e.preventDefault();
                valid && next();
            }}
            className="space-y-6"
        >
            <Input
                placeholder="Campaign Title"
                value={formData.campaignTitle}
                onChange={(e) => updateFormData({ campaignTitle: e.target.value })}
            />

            <Textarea
                placeholder="Campaign Description"
                value={formData.campaignDescription}
                onChange={(e) => updateFormData({ campaignDescription: e.target.value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    placeholder="Genre"
                    value={formData.genre}
                    onChange={(e) => updateFormData({ genre: e.target.value })}
                />
                <Input
                    placeholder="Influencers Needed"
                    type="number"
                    value={formData.influencersNeeded}
                    onChange={(e) => updateFormData({ influencersNeeded: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => updateFormData({ startDate: e.target.value })}
                />
                <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => updateFormData({ endDate: e.target.value })}
                />
            </div>

            <FileUpload onChange={(file) => updateFormData({ audioTrack: file })} />

            <div className="flex justify-end gap-4">
                <Button type="submit" disabled={!valid}>
                    Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};

const Step2 = ({ formData, updateFormData, prev, next }: any) => {
    const valid = formData.totalCampaignBudget && formData.rewardAmount;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                valid && next();
            }}
            className="space-y-6"
        >
            <Input
                placeholder="Total Budget"
                value={formData.totalCampaignBudget}
                onChange={(e) => updateFormData({ totalCampaignBudget: e.target.value })}
            />

            <Input
                placeholder="Reward Type"
                value={formData.rewardType}
                onChange={(e) => updateFormData({ rewardType: e.target.value })}
            />

            <Input
                placeholder="Reward Amount"
                value={formData.rewardAmount}
                onChange={(e) => updateFormData({ rewardAmount: e.target.value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    placeholder="Minimum Payout"
                    value={formData.minimumPayout}
                    onChange={(e) => updateFormData({ minimumPayout: e.target.value })}
                />
                <Input
                    placeholder="Maximum Payout"
                    value={formData.maximumPayout}
                    onChange={(e) => updateFormData({ maximumPayout: e.target.value })}
                />
            </div>

            <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={prev}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button type="submit" disabled={!valid}>
                    Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};

const Step3 = ({ formData, updateFormData, prev, next }: any) => (
    <div className="space-y-6">
        <Input
            placeholder="Target Platforms"
            value={formData.targetPlatform}
            onChange={(e) => updateFormData({ targetPlatform: e.target.value })}
        />

        <Textarea
            placeholder="Content Guidelines"
            value={formData.contentGuidelines}
            onChange={(e) => updateFormData({ contentGuidelines: e.target.value })}
        />

        <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={prev}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={next}>Next Step</Button>
        </div>
    </div>
);

const Step4 = ({ formData, updateFormData, prev, next }: any) => (
    <div className="space-y-6">
        <Input
            placeholder="Age Restriction"
            value={formData.ageRestriction}
            onChange={(e) => updateFormData({ ageRestriction: e.target.value })}
        />

        <Input
            placeholder="Location"
            value={formData.location}
            onChange={(e) => updateFormData({ location: e.target.value })}
        />

        <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={prev}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={next}>Next Step</Button>
        </div>
    </div>
);

const Step5 = ({ formData, prev, submit }: any) => (
    <div className="space-y-6">
        <div className="p-4 rounded-lg bg-gray-50 border">
            <pre className="text-xs whitespace-pre-wrap">
                {JSON.stringify(formData, null, 2)}
            </pre>
        </div>

        <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={prev}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={submit}>Submit Campaign</Button>
        </div>
    </div>
);

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
        targetPlatform: "",
        contentGuidelines: "",
        ageRestriction: "",
        location: "",
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
            <Stepper currentStep={step} />
            <div className="mt-8 p-6 border rounded-xl bg-white">{views[step]}</div>
        </div>
    );
}


export default CampaingsAddForm;