"use client"

import { formatChatTime } from "@/components/shared/FormatChatTime "
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { myFetch } from "@/utils/myFetch"
import {ArrowUpRight, Loader2} from "lucide-react"
import { useEffect, useState } from "react"

const AnayticsSummary = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

  const handleGetLink = async()=>{
    try {
      const response = await myFetch('/stripe-onboarding/account-link');      
      if(response?.data?.url){        
        window.location.href = response?.data?.url;
      }
    } catch (error) {
      console.error('Error fetching referral link:', error);
    }
  }

  useEffect(() => {
    fetchBalance()
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
                  onClick={()=>handleGetLink()}
                  className="bg-blue-600!  text-white gap-2"
                >
                  <ArrowUpRight className="h-5 w-5" />
                  Connect Wallet
                </Button>

                <Button
                  size="lg"
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
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="text-blue-500 cursor-pointer hover:underline">
                      View Details
                    </span>
                  </p>
                </div>

                <div className="w-full pt-4 border-t border-white/10">
                  <p className="text-sm text-muted-foreground">Payouts</p>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold">${data?.totalPayout}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatChatTime(data?.updatedAt)} {' '}
                    <span className="text-blue-500 cursor-pointer hover:underline">
                      View Details
                    </span>
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AnayticsSummary