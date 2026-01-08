"use client"

import { CircleAlert, Menu, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import Modal from "@/components/modals/Modal"
import CreatorReportForm from "@/components/shared/CreatorReportForm"

import ReviewModal from "@/components/shared/ReviewModal"
import { revalidate } from "@/helpers/revalidateHelper"
import { myFetch } from "@/utils/myFetch"
import { useSearchParams } from "next/navigation"
import { IoIosStar } from "react-icons/io"
import { toast } from "sonner"


const CreatorDropDownMenu = ({ submission }: { submission: any }) => {
    const [showRejectForm, setShowRejectForm] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [openReview, setOpenReview] = useState(false);

    const searchParams = useSearchParams();
    const status = searchParams.get("status");




    const submitReview = async (values: any) => {
        try {
            const data = { 
                ratingValue: values.ratingValue, 
                feedback: values.feedback, 
                targetId: submission?.campaignId?.campaignOwnerId?._id, 
                type: "PROMOTER" }
            const response = await myFetch(`/reviews`, {
                method: "POST",
                body: data
            })

            if (response?.success) {
                setOpenReview(false)
                toast.success(response?.message)
                revalidate("campaign-submissions")
            } else {
                setOpenReview(false)
                toast.error(response?.message)
            }
        } catch (error) {
            console.error(error)
        }
    }


    const handleReport = async (values: any) => {         
        try {
            const response = await myFetch(`/reports/create`, {
                method: "POST",
                body: {
                    campaignId: submission?.campaignId?._id,
                    reason: values.reason
                }
            });            
            if (response?.success) {
                setOpenReport(false);
                toast.success(response?.message);
                revalidate("campaign-submissions")
            } else {
                setOpenReport(false);
                toast.error(response?.message);
            }
        } catch (error) {
            console.log("handleReport", error);
        }
    }

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" aria-label="Open menu" size="icon-lg">
                        <Menu size={30} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 p-3 inset-0 shadow z-10" align="end">
                    <DropdownMenuGroup >                                               
                        <DropdownMenuItem onSelect={() => setOpenReview(true)} className="bg-yellow-600 hover:bg-yellow-700! text-white! mb-2">
                            Review
                            <DropdownMenuShortcut><IoIosStar className="text-yellow-200" /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setOpenReport(true)} className="bg-slate-600 hover:bg-slate-700! text-white!">
                            Report
                            <DropdownMenuShortcut><CircleAlert color="white" /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            
            {/* -------------- Report Form -------------- */}
            <Modal
                open={openReport}
                setOpen={setOpenReport}
                className='md:max-w-md! w-[90%]! md:w-full!'>
                <CreatorReportForm handleReport={handleReport} promotor={submission?.campaignId?.campaignOwnerId} closeModal={() => setOpenReport(false)} />
                
            </Modal>

            {/* -------------- Report Form -------------- */}
            <Modal
                open={openReview}
                setOpen={setOpenReview}
                className='md:max-w-md! w-[90%]! md:w-full!'>
                <ReviewModal promotor={submission?.campaignId?.campaignOwnerId} submitReview={submitReview} closeModal={() => setOpenReview(false)} />
            </Modal>
        </>
    )
}


export default CreatorDropDownMenu;