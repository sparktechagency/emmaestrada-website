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
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { revalidate } from "@/helpers/revalidateHelper";

export function DropDownMenu({ campaignData }: { campaignData: any }) {
    const [showAddBudget, setShowAddBudget] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectCampaign, setSelectCampaign] = useState(null);
    const [budget, setBudget] = useState(5000);
    const router = useRouter();

    const handleAddBudget = async () => {
        try {
            const response = await myFetch(`/orders/create-and-checkout`, {
                method: 'POST',
                body: { campaignId: campaignData?._id },
            });
            if (response?.data?.url) {
                router.push(response.data.url);
            } else {
                toast.error(response?.message || 'Failed to add budget');
            }
        } catch (error: any) {
            toast.error(error?.message || 'An error occurred');
        }
    };

    const handleDeleteCampaign = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (!result.isConfirmed) return;

        try {
            const response = await myFetch(`/campaigns/delete/${campaignData?._id}`, {
                method: 'DELETE',
            });

            if (response?.success) {
                Swal.fire('Deleted!', 'Your campaign has been deleted.', 'success');
            } else {
                toast.error(response?.message || 'Failed to delete campaign');
            }
        } catch (error: any) {
            Swal.fire('Error!', error?.message || 'Failed to delete campaign.', 'error');
        }
    };

    const handleRefund = async () => {
        const result = await Swal.fire({
            title: 'Refund Campaign Budget?',
            html: `<p>Current Budget: <strong>$${campaignData?.remainingAmount || 0}</strong></p>
                   <p class="text-sm mt-1"><strong>Note:</strong> A platform fee of <strong class="text-orange-600">$${campaignData?.platformFee}</strong> will be charged.</p>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, refund it!',
        });

        if (!result.isConfirmed) return;

        try {
            const response = await myFetch(`/orders/refund-campaign-amount/${campaignData?._id}`, {
                method: 'POST',
            });

            if (response?.success) {
                Swal.fire('Refunded!', 'Your campaign budget has been refunded successfully.', 'success');
                revalidate("promotor-campaigns");
            } else {
                toast.error(response?.message || 'Failed to process refund');
            }
        } catch (error: any) {
            Swal.fire('Error!', error?.message || 'Failed to process refund.', 'error');
        }
    };

    return (
        <div>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer bg-orange-500">Actions <Menu /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => { setShowEdit(true); setSelectCampaign(campaignData); }}>
                            Edit <DropdownMenuShortcut><Edit /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem hidden={!["pending", "inactive",  "refunded"].includes(campaignData?.status)} onSelect={handleDeleteCampaign}>
                            Delete <DropdownMenuShortcut><Trash2 /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem hidden={["inactive", "ended", "pending", "refunded"].includes(campaignData?.status)} onSelect={handleRefund}>
                            Refund <DropdownMenuShortcut><BanknoteArrowDown /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem hidden={campaignData?.status === "active"} onSelect={handleAddBudget}>
                            Add Budget <DropdownMenuShortcut><CirclePlus /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {showEdit && (
                <Dialog open={showEdit} onOpenChange={setShowEdit}>
                    <DialogContent className="md:min-w-[800px] h-[85vh] overflow-y-auto">
                        <CampaingsAddForm onClose={() => { setShowEdit(false); setSelectCampaign(null); }} editData={selectCampaign} />
                    </DialogContent>
                </Dialog>
            )}

            <AddBudgetDialog
                open={showAddBudget}
                previousBudget={budget}
                onCancel={() => setShowAddBudget(false)}
                onConfirm={(total) => setBudget(total)}
            />
        </div>
    );
}
