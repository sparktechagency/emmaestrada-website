'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2, Download, RefreshCw, ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { myFetch } from '@/utils/myFetch'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { FormatDate } from '@/components/shared/FormatDate'

export default function Transactions() {
  const [transactions, setTransactions] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [totalWithdrawals, setTotalWithdrawals] = useState(0)
  const [totalDeposits, setTotalDeposits] = useState(0)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await myFetch('/wallets/transactions')

      console.log("Transactions Response:", response)
      
      if (response?.success && response?.data) {
        const transactionData = Array.isArray(response.data) ? response.data : []
        setTransactions(transactionData)
        
        // Calculate totals
        const withdrawals = transactionData
          .filter(t => t.type === 'WITHDRAWAL')
          .reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
        const deposits = transactionData
          .filter(t => t.type === 'DEPOSIT' || t.type === 'CREDIT')
          .reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
        
        setTotalWithdrawals(withdrawals)
        setTotalDeposits(deposits)
      } else {
        console.error('Failed to fetch transactions:', response?.message)
        toast.error(response?.message || 'Failed to fetch transactions')
        setTransactions([])
      }
    } catch (err) {
      console.error('Error fetching transactions:', err)
      toast.error('Failed to load transactions')
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount :any) => {
    const numValue = Number(amount)
    if (isNaN(numValue)) return '$0.00'
    return `$${(numValue / 100).toFixed(2)}`
  }

  const formatDate = (dateString :any) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTransactionStatus = (status :any) => {
    const statusUpper = status?.toUpperCase() || ''
    
    const statusConfig = {
      SUCCESS: { label: 'Success', class: 'bg-green-600 hover:bg-green-700 text-white' },
      PENDING: { label: 'Pending', class: 'bg-yellow-500 hover:bg-yellow-600 text-white' },
      APPROVED: { label: 'Approved', class: 'bg-blue-500 hover:bg-blue-600 text-white' },
      PROCESSING: { label: 'Processing', class: 'bg-blue-600 hover:bg-blue-700 text-white' },
      COMPLETED: { label: 'Completed', class: 'bg-green-600 hover:bg-green-700 text-white' },
      REJECTED: { label: 'Rejected', class: 'bg-red-600 hover:bg-red-700 text-white' },
      FAILED: { label: 'Failed', class: 'bg-red-700 hover:bg-red-800 text-white' }
    }

    const config = statusConfig[statusUpper as  keyof typeof statusConfig] || { label: status || 'Unknown', class: 'bg-gray-500 hover:bg-gray-600 text-white' }
    
     
    return (
      <Badge className={`rounded-full ${config.class}`}>
        {config.label}
      </Badge>
    )
  }

  const getTransactionType = (type:any) => {
    const typeUpper = type?.toUpperCase() || ''
    
    if (typeUpper === 'WITHDRAWAL') {
      return (
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-100 rounded-full">
            <ArrowDownLeft className="h-4 w-4 text-red-600" />
          </div>
          <span className="font-medium text-red-600">Withdrawal</span>
        </div>
      )
    } else if (typeUpper === 'DEPOSIT' || typeUpper === 'CREDIT') {
      return (
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-green-100 rounded-full">
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </div>
          <span className="font-medium text-green-600">Deposit</span>
        </div>
      )
    }
    
    return (
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-600">{type}</span>
      </div>
    )
  }


  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Loading transactions...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='bg-orange-50 mt-6'>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <div className="flex gap-6 mt-3">
              <div>
                <p className="text-xs text-gray-600">Total Withdrawals</p>
                <p className="text-lg font-bold text-red-600">${totalWithdrawals}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Deposits</p>
                <p className="text-lg font-bold text-green-600">${totalDeposits}</p>
              </div>           
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchTransactions} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance Before</TableHead>
                <TableHead className="text-right">Balance After</TableHead>              
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-lg font-medium">No transactions found</p>
                      <p className="text-sm">Your transaction history will appear here</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction:any, index:number) => (
                  <TableRow key={transaction._id || transaction.transactionId || index} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-mono text-xs font-medium">
                          {transaction.transactionId || 'N/A'}
                        </span>
                        {transaction.stripeTransferId && (
                          <span className="font-mono text-xs text-gray-500">
                            Stripe: {transaction.stripeTransferId}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTransactionType(transaction.type)}
                    </TableCell>
                    <TableCell className="text-left">
                      <span className={`font-bold ${transaction.type === 'WITHDRAWAL' ? 'text-red-600' : 'text-green-600'}`}>
                       ${transaction.amount}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm text-gray-600">
                        {transaction.balanceBefore}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-medium">
                        {transaction.balanceAfter}
                      </span>
                    </TableCell>                    
                    <TableCell className="text-center">
                      {getTransactionStatus(transaction.status)}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {FormatDate(transaction.createdAt)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {transactions.length > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600 px-2">
            <span>Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</span>
            <div className="flex gap-4">
              <span>Withdrawals: <strong className="text-red-600">${totalWithdrawals}</strong></span>
              <span>Deposits: <strong className="text-green-600">{totalDeposits}</strong></span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}