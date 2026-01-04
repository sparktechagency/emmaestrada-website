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

export function DropDownMenu({ campaignData }: { campaignData: any }) {
    const [showRefund, setShowRefund] = useState(false);
    const [showAddBudget, setShowAddBudget] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [budget, setBudget] = useState(5000);

    const [showEdit, setShowEdit] = useState(false);
    const [selectCampaign, setSelectCampaign] = useState(null);
    const router = useRouter()


    const handleAddBudget = async () => {
        try {
            const response = await myFetch(`/orders/create-and-checkout`, {
                method: 'POST',
                body: { campaignId: campaignData?._id },
            });

            console.log("handleAddBudget", response);

            if (response?.success) {
                console.log('Budget Added:', response);
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
                console.log("handleDeleteCampaign", response);

                if (response?.success) {
                    console.log('Campaign Deleted:', response);
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
                        <DropdownMenuItem onSelect={() => setShowRefund(true)}>
                            Refund
                            <DropdownMenuShortcut><BanknoteArrowDown /> </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={handleAddBudget}>
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
