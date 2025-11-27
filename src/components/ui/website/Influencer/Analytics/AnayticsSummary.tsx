import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowUpRight
} from "lucide-react"

const AnayticsSummary = () => {
  return (
    <div className="">
      <div className="mb-6 mt-10">
        <h1 className={`mb-2 text-3xl font-semibold`}>Campaigns</h1>
        <p className="textPara">Browse and join music campaigns</p>
      </div>

      <Card className="bg-black text-white rounded-2xl">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center justify-end mb-5">
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
                  <h2 className="text-3xl font-bold">$100.00</h2>                  
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
                  <h2 className="text-3xl font-bold">$969.76</h2>
                  <Badge className="bg-green-600 text-white">Completed</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  6 months ago ·{" "}
                  <span className="text-blue-500 cursor-pointer hover:underline">
                    View Details
                  </span>
                </p>
              </div>
            </div>          
        </CardContent>
      </Card>
    </div>

  )
}

export default AnayticsSummary