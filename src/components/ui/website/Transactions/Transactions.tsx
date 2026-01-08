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
import { Loader2, Download, RefreshCw } from "lucide-react"
import Image from "next/image"
import { myFetch } from '@/utils/myFetch'
import { imageUrl } from '@/constants'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'



export default function Transactions() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalEarnings, setTotalEarnings] = useState(0)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await myFetch('/wallets/transactions')

      console.log("Campaign Performance Response:", response)
      
      if (response?.success && response?.data) {
        const transactionData = Array.isArray(response.data) ? response.data : []
        setTransactions(transactionData)
        
        // Calculate total earnings
        const total = transactionData.reduce((sum, item) => sum + (Number(item.totalEarned) || 0), 0)
        setTotalEarnings(total)
      } else {
        console.error('Failed to fetch transactions:', response?.message)
        toast.error(response?.message)
        setTransactions([])
      }
    } catch (err:any) {
      console.error('Error fetching transactions:', err)
      setError(err?.message || 'An error occurred while fetching transactions')
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num:any) => {
    const numValue = Number(num)
    if (isNaN(numValue)) return '0'
    
    if (numValue >= 1000000) {
      return (numValue / 1000000).toFixed(1) + 'M'
    }
    if (numValue >= 1000) {
      return (numValue / 1000).toFixed(1) + 'K'
    }
    return numValue.toLocaleString()
  }

  const formatCurrency = (amount :any) => {
    const numValue = Number(amount)
    if (isNaN(numValue)) return '$0.00'
    return `$${numValue.toFixed(2)}`
  }

  const getPlatformIcon = (platform :any) => {
    const platformLower = platform?.toLowerCase() || ''
    const icons = {
      instagram: "/instagram.png",
      tiktok: "/tiktokBlack.png",
      youtube: "/youtube.png"
    }
    return icons[platformLower as keyof typeof icons] || "/default.png"
  }

  const getPaymentStatus = (status: any) => {
    const statusLower = status?.toLowerCase() || ''
    
    const statusConfig = {
      completed: { label: 'Paid', class: 'bg-green-600 hover:bg-green-700' },
      pending: { label: 'Pending', class: 'bg-yellow-600 hover:bg-yellow-700' },
      processing: { label: 'Processing', class: 'bg-blue-600 hover:bg-blue-700' },
      upcoming: { label: 'Scheduled', class: 'bg-gray-600 hover:bg-gray-700' },
      active: { label: 'In Progress', class: 'bg-blue-500 hover:bg-blue-600' },
      cancelled: { label: 'Cancelled', class: 'bg-red-600 hover:bg-red-700' }
    }

    const config = statusConfig[statusLower as keyof typeof statusConfig] || { label: 'Active', class: 'bg-blue-500 hover:bg-blue-600' }
    
    return (
      <Badge className={`rounded-full ${config.class}`}>
        {config.label}
      </Badge>
    )
  }

  const exportTransactions = () => {
    // Export functionality
    const csvContent = [
      ['Campaign', 'Brand', 'Submissions', 'Views', 'Engagement %', 'Earnings', 'Status'],
      ...transactions.map((t:any) => [
        t.campaignTitle,
        t.brandName,
        t.submissions,
        t.totalViews,
        t.avgEngagement?.toFixed(2),
        t.totalEarned?.toFixed(2),
        t.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Campaign Transactions</CardTitle>
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

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Campaign Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchTransactions} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='bg-orange-50 mt-6'>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Campaign Transactions</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Total Earnings: <span className="font-bold text-green-600">{formatCurrency(totalEarnings)}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchTransactions} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={exportTransactions} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Campaign</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead className="text-center">Submissions</TableHead>
                <TableHead className="text-center">Views</TableHead>
                <TableHead className="text-center">Engagement</TableHead>
                <TableHead className="text-right">Earnings</TableHead>
                <TableHead className="text-center">Platform</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-lg font-medium">No transactions found</p>
                      <p className="text-sm">Complete campaigns to see your earnings here</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction: any, index) => (
                  <TableRow key={transaction._id || transaction.id || index} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {transaction.campaignThumbnail ? (
                          <Image
                            src={`${imageUrl}${transaction.campaignThumbnail}`}
                            alt={transaction.campaignTitle || 'Campaign'}
                            unoptimized
                            width={48}
                            height={48}
                            className="rounded-lg object-cover border"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.png'
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-linear-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-bold text-orange-600">
                              {transaction.campaignTitle?.[0] || 'C'}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-sm line-clamp-1">
                            {transaction.campaignTitle || 'Untitled Campaign'}
                          </span>
                          <span className="text-xs text-gray-500">
                            ID: {transaction._id?.slice(-6) || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{transaction.brandName || 'N/A'}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium">{transaction.submissions || 0}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium">{formatNumber(transaction.totalViews || 0)}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm">
                        {transaction.avgEngagement != null ? `${Number(transaction.avgEngagement).toFixed(2)}%` : '0.00%'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-green-600">
                        {formatCurrency(transaction.totalEarned || 0)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 justify-center">
                        {Array.isArray(transaction.platforms) && transaction.platforms.length > 0 ? (
                          transaction.platforms.map((platform:any, idx:number) => (
                            <div key={idx} className="relative group">
                              <Image
                                src={getPlatformIcon(platform)}
                                height={20}
                                width={20}
                                alt={platform || 'platform'}
                                className="h-5 w-5 object-contain"
                                onError={(e) => {
                                  e.currentTarget.src = '/default.png'
                                }}
                              />
                              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {platform}
                              </span>
                            </div>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">N/A</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {getPaymentStatus(transaction.status)}
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
            <span>Total: <strong className="text-green-600">{formatCurrency(totalEarnings)}</strong></span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}