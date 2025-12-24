'use client';

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { BanknoteArrowDown, CirclePlus, Edit, Menu, Trash2 } from "lucide-react";
import { useState } from "react";
import CampaingsAddForm from "../CampaingsAddForm";
import { AddBudgetDialog } from "./AddBudgetDialog";
import { RefundDialog } from "./RefundDialog";

    export function DropDownMenu() {
    const [showRefund, setShowRefund] = useState(false);
    const [showAddBudget, setShowAddBudget] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [budget, setBudget] = useState(5000);



    return (
        <div className="">
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button  className="cursor-pointer bg-orange-500">Actions <Menu /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => setShowEdit(true)}>
                            Edit
                            <DropdownMenuShortcut><Edit /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setShowDelete(true)}>
                            Delete
                            <DropdownMenuShortcut> <Trash2 /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={()=>setShowRefund(true)}>
                            Refund
                            <DropdownMenuShortcut><BanknoteArrowDown /> </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={()=>setShowAddBudget(true)}>
                            Add Budget
                            <DropdownMenuShortcut> <CirclePlus /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            {showEdit && <Dialog open={showEdit} onOpenChange={setShowEdit}>
                <DialogContent className="md:min-w-[800px] h-[85vh] overflow-y-auto">
                    <CampaingsAddForm editData={demoEditData} />
                </DialogContent> </Dialog>}

            <ConfirmDialog
                open={showDelete}
                title="Archive"
                message="Archiving this Content Reward will disable new submissions and stop view polling."
                subMessage="This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={() => {
                    console.log("Archived!");
                    setShowDelete(false);
                }}
                onCancel={() => setShowDelete(false)}
            />

            <AddBudgetDialog
                open={showAddBudget}
                previousBudget={budget}
                onCancel={() => setShowAddBudget(false)}
                onConfirm={(addedAmount, total) => {
                    setBudget(total);
                    console.log("Added:", addedAmount);
                }}
            />

            <RefundDialog
        open={showRefund}
        onCancel={() => setShowRefund(false)}
        onConfirm={(refundAmount, afterFee, fee) => {
          console.log("Refund amount:", refundAmount);
          console.log("Fee:", fee);
          console.log("User receives:", afterFee);
          setShowRefund(false);
        }}
      />
        
        </div >
    )
}

const demoEditData = {
    campaignTitle: "Summer Music Blast",
    campaignDescription: "Promote the latest summer hits with influencers.",
    genre: "Pop",
    influencersNeeded: "25",
    startDate: "2025-01-10",
    endDate: "2025-02-01",
    audioTrack: "/audio/sample-track.mp3",
    totalCampaignBudget: "5000",
    rewardType: "Fixed",
    rewardAmount: "200",
    minimumPayout: "50",
    maximumPayout: "500",
    targetPlatform: ["TikTok", "Instagram", "YouTube"],
    contentGuidelines: [
        "Use the official audio",
        "Tag @musicbrand",
        "Use hashtag #SummerBlast",
    ],
    ageRestriction: "18+",
    location: "USA, Canada",
    campaignRequirements: [
        "Influencers must have at least 10k followers",
        "Content should be posted within 48 hours of acceptance",
    ],
    campaignAssets: "/assets/campaign-images/banner.jpg",
};
