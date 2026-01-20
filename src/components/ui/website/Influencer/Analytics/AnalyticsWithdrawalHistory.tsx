import { myFetch } from '@/utils/myFetch'
import React from 'react'
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
import Image from 'next/image'
import { imageUrl } from '@/constants'
import { FormatDate } from '@/components/shared/FormatDate'
import { Badge } from '@/components/ui/badge'



const getPaymentStatus = (status:any) => {
    const statusUpper = status?.toUpperCase() || ''

    const statusConfig = {
        PENDING: { label: 'Pending', class: 'bg-yellow-500 hover:bg-yellow-600 text-white' },
        APPROVED: { label: 'Approved', class: 'bg-blue-500 hover:bg-blue-600 text-white' },
        PROCESSING: { label: 'Processing', class: 'bg-blue-600 hover:bg-blue-700 text-white' },
        COMPLETED: { label: 'Completed', class: 'bg-green-600 hover:bg-green-700 text-white' },
        REJECTED: { label: 'Rejected', class: 'bg-red-600 hover:bg-red-700 text-white' },
        FAILED: { label: 'Failed', class: 'bg-red-700 hover:bg-red-800 text-white' }
    }

    const config = statusConfig[statusUpper as keyof typeof statusConfig] || { label: status || 'Unknown', class: 'bg-gray-500 hover:bg-gray-600 text-white' }

    return (
        <Badge className={`rounded-full ${config.class}`}>
            {config.label}
        </Badge>
    )
}


const AnalyticsWithdrawalHistory = async () => {
    const withdrawData = await myFetch("/withdrawal");
    return (
        <Card className='bg-orange-50 mb-6'>
            <CardHeader>
                <CardTitle>Withdrawal History</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Request Id</TableHead>
                                <TableHead>Wallet Id</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Currency</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Approval Status</TableHead>
                                <TableHead>Requesting Date</TableHead>
                                {/* <TableHead>Action</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {withdrawData?.data?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                        No campaign data available
                                    </TableCell>
                                </TableRow>
                            ) : (
                                withdrawData?.data?.map((row: any) => (
                                    <TableRow key={row._id}>
                                        <TableCell>{row?.requestId ?? ""}</TableCell>
                                        <TableCell>{row?.walletId}</TableCell>
                                        <TableCell>{row?.amount}</TableCell>
                                        <TableCell>{row?.currency}</TableCell>
                                        <TableCell>{row?.withdrawalMethod}</TableCell>
                                        <TableCell className="text-center">{getPaymentStatus(row?.status)}</TableCell>
                                        <TableCell>{FormatDate(row?.createdAt)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

export default AnalyticsWithdrawalHistory