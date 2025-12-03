"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { BsExclamationTriangle } from "react-icons/bs";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  subMessage?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  subMessage,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-sm bg-white border border-gray-200 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>

        {/* Warning Box */}
        <div className="rounded-md bg-red-100 border border-red-300 p-4 text-red-700 flex items-start gap-3">
          <BsExclamationTriangle className="w-6 h-6 mt-1" />
          <div className="space-y-1">
            <p className="font-medium">{message}</p>
            {subMessage && (
              <p className="text-sm opacity-90">{subMessage}</p>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            className="border-gray-300"
            onClick={onCancel}
          >
            {cancelText}
          </Button>

          <Button variant="destructive" onClick={onConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
