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
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { revalidate } from "@/helpers/revalidateHelper";

export function DropDownMenu({ campaignData }: { campaignData: any }) {
    // const [showRefund, setShowRefund] = useState(false);
    const [showAddBudget, setShowAddBudget] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [budget, setBudget] = useState(5000);

    const [showEdit, setShowEdit] = useState(false);
    const [selectCampaign, setSelectCampaign] = useState(null);
    const router = useRouter()


    console.log("campaignData", campaignData);
    
    const handleAddBudget = async () => {
        try {
            const response = await myFetch(`/orders/create-and-checkout`, {
                method: 'POST',
                body: { campaignId: campaignData?._id },
            });
            if (response?.success) {

                if (response?.success && response?.data?.url) {
                    router.push(response.data.url);
                }
            } else if (response?.message) {
                toast.error(response?.message);
            }
        } catch (error: any) {
            toast.error(error?.message);
            console.log("error", error);
        }
    }

    const handleDeleteCampaign = async () => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                const response = await myFetch(`/campaigns/delete/${campaignData?._id}`, {
                    method: 'DELETE',
                });

                if (response?.success) {
                    Swal.fire(
                        'Deleted!',
                        'Your campaign has been deleted.',
                        'success'
                    );
                }
            }
        } catch (error: any) {
            toast.error(error?.message);
            console.log("error", error);
            Swal.fire(
                'Error!',
                error?.message || 'Failed to delete campaign.',
                'error'
            );
        }
    }

    const handleRefund = async () => {
        try {
            const result = await Swal.fire({
                title: 'Refund Campaign Budget?',
                html: `
                    <p>Current Budget: <strong>$${campaignData?.remainingAmount || 0}</strong></p>
                    <p class="text-sm y mt-1"><strong>Note:</strong> A platform fee of <strong class="text-orange-600">$${campaignData?.platformFee}</strong> will be charged for this transaction.</p>
                `,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, refund it!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                const response = await myFetch(`/orders/refund-campaign-amount/${campaignData?._id}`, {
                    method: 'POST',
                });
                if (response?.success) {
                    Swal.fire(
                        'Refunded!',
                        'Your campaign budget has been refunded successfully.',
                        'success'
                    );
                    revalidate("promotor-campaigns")
                } else {
                    toast.error(response?.message || 'Failed to process refund');
                }
            }
        } catch (error: any) {
            toast.error(error?.message);
            console.log("error", error);
            Swal.fire(
                'Error!',
                error?.message || 'Failed to process refund.',
                'error'
            );
        }
    }

    return (
        <div className="">
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer bg-orange-500">Actions <Menu /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => { setShowEdit(true); setSelectCampaign(campaignData) }}>
                            Edit
                            <DropdownMenuShortcut><Edit /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleDeleteCampaign()}>
                            Delete
                            <DropdownMenuShortcut> <Trash2 /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem hidden={campaignData?.status === "upcoming" || campaignData?.status === "ended" } onSelect={() => handleRefund()}>
                            Refund
                            <DropdownMenuShortcut><BanknoteArrowDown /> </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem hidden={campaignData?.status === "active"} onSelect={handleAddBudget}>
                            Add Budget
                            <DropdownMenuShortcut> <CirclePlus /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            {showEdit && <Dialog open={showEdit} onOpenChange={setShowEdit}>
                <DialogContent className="md:min-w-[800px] h-[85vh] overflow-y-auto">
                    <CampaingsAddForm onClose={() => { setShowEdit(false); setSelectCampaign(null) }} editData={selectCampaign} />
                </DialogContent> </Dialog>}

            <ConfirmDialog
                open={showDelete}
                title="Archive"
                message="Archiving this Content Reward will disable new submissions and stop view polling."
                subMessage="This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={() => {
                    setShowDelete(false);
                }}
                onCancel={() => setShowDelete(false)}
            />

            <AddBudgetDialog
                open={showAddBudget}
                previousBudget={budget}
                onCancel={() => setShowAddBudget(false)}
                onConfirm={(total) => {
                    setBudget(total);
                }}
            />

            {/* <RefundDialog
                open={showRefund}
                onCancel={() => setShowRefund(false)}
                onConfirm={() => {                    
                    setShowRefund(false);
                }}
            /> */}

        </div >
    )
}