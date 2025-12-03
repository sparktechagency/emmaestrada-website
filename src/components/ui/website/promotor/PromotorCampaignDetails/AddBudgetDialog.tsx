"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";


interface AddBudgetDialogProps {
    open: boolean;
    previousBudget: number;
    onCancel: () => void;
    onConfirm: (newValue: number, total: number) => void;
}

export function AddBudgetDialog({
    open,
    previousBudget,
    onCancel,
    onConfirm,
}: AddBudgetDialogProps) {
    const [amount, setAmount] = useState<number | "">("");
    const [confirmOpen, setConfirmOpen] = useState(false);

    const total = previousBudget + (Number(amount) || 0);

    function handleSubmit() {
        if (!amount || Number(amount) <= 0) return;
        setConfirmOpen(true);
    }

    return (
        <>
            {/* Main Form Dialog */}
            <Dialog open={open} onOpenChange={onCancel}>
                <DialogContent className="max-w-sm bg-white border border-gray-200 shadow-xl">
                    <DialogHeader className="border-b pb-2">
                        <DialogTitle className="text-lg font-semibold">Add Budget</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 ">
                        <div className="flex justify-between mb-2">
                            <div className="text-sm">
                                <p className="font-medium">Previous Budget:</p>
                                <p className="text-gray-700">{previousBudget} BDT</p>
                            </div>
                            <div className="text-sm">
                                <p className="font-medium">New Total Budget:</p>
                                <p className="text-gray-700">{total} BDT</p>
                            </div>
                        </div>


                        <div className="space-y-1">
                            <label className="text-sm font-medium">Additional Budget</label>
                            <Input
                                type="number"
                                value={amount}
                                style={{height:45}}
                                placeholder="Enter amount"
                                onChange={(e) => setAmount(Number(e.target.value))}
                            />
                        </div>


                    </div>

                    <DialogFooter className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={!amount}>
                            Continue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <ConfirmDialog
                open={confirmOpen}
                title="Confirm Budget Update"
                message={`You are adding ${amount} BDT to this budget.`}
                subMessage={`New total will be ${total} BDT.`}
                confirmText="Add Budget"
                cancelText="Cancel"
                onConfirm={() => {
                    onConfirm(Number(amount), total);
                    setConfirmOpen(false);
                    onCancel();
                }}
                onCancel={() => setConfirmOpen(false)}
            />
        </>
    );
}
