"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

interface RefundDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: (refundAmount: number, afterFee: number, fee: number) => void;
}

export function RefundDialog({
  open,
  onCancel,
  onConfirm
}: RefundDialogProps) {
  const [amount, setAmount] = useState<number | "">("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Calculate 8% deduction
  const fee = useMemo(() => (Number(amount) || 0) * 0.08, [amount]);
  const afterFee = useMemo(() => (Number(amount) || 0) - fee, [amount]);

  function handleContinue() {
    if (!amount || Number(amount) <= 0) return;
    setConfirmOpen(true);
  }

  return (
    <>
      {/* Refund Form Dialog */}
      <Dialog open={open} onOpenChange={onCancel}>
        <DialogContent className="max-w-sm bg-white border border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Request Refund
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Input Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Refund Amount (USD)</label>
              <Input
                type="number"
                value={amount}
                placeholder="Enter refund amount"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>

            {/* Calculations */}
            {amount && Number(amount) > 0 && (
              <div className="rounded-md bg-red-100 border border-red-300 p-4 text-red-700">
                <p className="font-medium">
                  Mission fee (8%): {fee.toFixed(2)} USD
                </p>
                <p className="mt-1">
                  You will receive: <b>{afterFee.toFixed(2)} USD</b>
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>

            <Button onClick={handleContinue} disabled={!amount}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Confirm Refund"
        message={`Refunding ${amount} USD will deduct an 8% mission fee.`}
        subMessage={`You will receive ${afterFee.toFixed(2)} USD after a ${fee.toFixed(2)} USD fee.`}
        confirmText="Confirm Refund"
        cancelText="Cancel"
        onConfirm={() => {
          onConfirm(Number(amount), afterFee, fee);
          setConfirmOpen(false);
          onCancel();
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
