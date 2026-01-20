"use client"



import { FormatDate } from "@/components/shared/FormatDate"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { myFetch } from "@/utils/myFetch"
import { AlertCircle, ArrowUpRight, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Swal from "sweetalert2"

const PAnalyticsSummary = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [accountData, setAccountData] = useState(null)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawing, setWithdrawing] = useState(false)

  const fetchBalance = async () => {
    try {
      setLoading(true)
      const balanceData = await myFetch("/wallets/balance")
      setData(balanceData?.data)
    } catch (error) {
      console.error("Error fetching balance:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleGetLink = async () => {
    try {

      if (!(accountData as any)?.accountId) {
        await myFetch("/stripe-onboarding/connect-account", { method: "POST" });
      }
      const response = await myFetch("/stripe-onboarding/account-link")

      if (response?.success) {
        window.location.href = response?.data?.url
      }
    } catch (error) {
      console.error("Error fetching referral link:", error)
    }
  }

  const getAccountStatus = async () => {
    try {
      const response = await myFetch("/stripe-onboarding/account-status")
      if (response?.success) {
        setAccountData(response?.data)
      }
    } catch (error) {
      console.error("Error fetching referral link:", error)
    }
  }

  const handleWithdrawClick = () => {
    if ((accountData as any)?.accountStatus !== "active") {
      Swal.fire({
        title: "Account Not Connected",
        text: "Please connect your wallet before making a withdrawal.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3B82F6",
        cancelButtonColor: "#6B7280",
        confirmButtonText: "Connect Wallet",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          handleGetLink()
        }
      })
    } else {
      setShowWithdrawModal(true)
      setWithdrawAmount("")
    }
  }

  const handleWithdrawSubmit = async () => {
    setShowWithdrawModal(false)
    const amount = parseFloat(withdrawAmount)

    // Validation
    if (!withdrawAmount || isNaN(amount)) {
      Swal.fire({
        title: "Invalid Amount",
        text: "Please enter a valid withdrawal amount.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      })
      return
    }

    if (amount <= 0) {
      Swal.fire({
        title: "Invalid Amount",
        text: "Withdrawal amount must be greater than zero.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      })
      return
    }

    if (amount > data?.balance) {
      Swal.fire({
        title: "Insufficient Balance",
        text: `You can only withdraw up to $${data?.balance}.`,
        icon: "error",
        confirmButtonColor: "#EF4444",
      })
      return
    }

    // Confirmation
    const result = await Swal.fire({
      title: "Confirm Withdrawal",
      html: `
        <div class="text-left">
          <p class="mb-2">You are about to withdraw:</p>
          <p class="text-2xl font-bold text-green-600 mb-4">$${amount.toFixed(2)}</p>
          <div class="mb-4 p-3 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-500 mb-1">Withdrawal Method:</p>
            <p class="font-semibold text-gray-800">Bank Account</p>
          </div>
          <p class="text-sm text-gray-600">This amount will be transferred to your connected bank account.</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Confirm Withdrawal",
      cancelButtonText: "Cancel",
    })

    if (result.isConfirmed) {
      try {
        setWithdrawing(true)

        // Make API call to process withdrawal
        const response = await myFetch("/withdrawal/create", {
          method: "POST",
          body: { amount, withdrawalMethod: "BANK_ACCOUNT" },
        })
        if (response?.success) {
          Swal.fire({
            title: "Withdrawal Successful!",
            text: `$${amount.toFixed(2)} has been withdrawn successfully.`,
            icon: "success",
            confirmButtonColor: "#10B981",
          })

          // Refresh balance
          fetchBalance()
          setShowWithdrawModal(false)
          setWithdrawAmount("")
          setWithdrawing(false)
        } else {
          toast.error(response?.message)
          setWithdrawing(false)
        }
      } catch (error: any) {
        Swal.fire({
          title: "Withdrawal Failed",
          text: error.message || "An error occurred while processing your withdrawal.",
          icon: "error",
          confirmButtonColor: "#EF4444",
        })
      }
    }
  }

  useEffect(() => {
    fetchBalance()
    getAccountStatus()
  }, [])

  return (
    <div className="">
      <div className="mb-6 mt-10">
        <h1 className={`mb-2 text-3xl font-semibold`}>Analytics Dashboard</h1>
        <p className="textPara">Track your performance and growth metrics</p>
      </div>

      <Card className="bg-black text-white rounded-2xl">
        <CardContent className="p-6 md:p-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-end mb-5 gap-3">
                <Button
                  size="lg"
                  onClick={handleWithdrawClick}
                  className="bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <ArrowUpRight className="h-5 w-5" />
                  Withdraw
                </Button>
              </div>

              <div className="flex items-end justify-between gap-5">
                <div className="w-full pt-4 border-t border-white/10">
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold">${data?.balance ?? 0}</h2>
                  </div>                  
                </div>

                <div className="w-full pt-4 border-t border-white/10">
                  <p className="text-sm text-muted-foreground">Payouts</p>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold">${data?.totalPayout}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {FormatDate(data?.updatedAt)}{" "}                    
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Withdrawal Modal */}
      <Dialog open={showWithdrawModal} onOpenChange={setShowWithdrawModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>
              Enter the amount you want to withdraw from your balance.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Withdrawal Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="pl-7"
                  step="0.01"
                  min="0"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Available balance: ${data?.balance ?? 0}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg flex gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900 dark:text-blue-100">
                Funds will be transferred to your connected payment method within
                2-3 business days.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowWithdrawModal(false)}
              disabled={withdrawing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleWithdrawSubmit}
              disabled={withdrawing}
              className="bg-green-600 hover:bg-green-700"
            >
              {withdrawing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Withdraw"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PAnalyticsSummary