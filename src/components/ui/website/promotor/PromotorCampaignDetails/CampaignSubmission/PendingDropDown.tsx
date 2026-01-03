"use client"

import { Check, CircleAlert, Menu, X } from "lucide-react"
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
import RejectSubmissionForm from "./RejectSubmissionModal"
import { IoIosStar } from "react-icons/io"
import ReviewModal from "@/components/shared/ReviewModal"
import { myFetch } from "@/utils/myFetch"


const PendingDropDown = ({submission}: {submission: any }) => {
    const [showRejectForm, setShowRejectForm] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [openReview, setOpenReview] = useState(false);

    const handleAcceptSubmission = async ()=>{
        try {
            await myFetch(`/submissions/accept-submission/${submission?._id}`, {
                method: "PATCH",
                body: { status: "accepted" },
            });
        } catch (error) {
            console.log("Error accepting submission:", error);
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
                        <DropdownMenuItem onClick={handleAcceptSubmission} className="bg-green-600 hover:bg-green-700! text-white! mb-2">
                            Accept
                            <DropdownMenuShortcut><Check color="white" /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setShowRejectForm(true)} className="bg-red-600 hover:bg-red-700! text-white! mb-2">
                            Reject
                            <DropdownMenuShortcut><X color="white" /></DropdownMenuShortcut>
                        </DropdownMenuItem>
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

            {/* -------------- Reject Form -------------- */}
            <Modal
                open={showRejectForm}
                setOpen={setShowRejectForm}
                className='md:max-w-md! w-[90%]! md:w-full!'>
                <RejectSubmissionForm submission={submission} closeModal={() => setShowRejectForm(false)} />
            </Modal>

            {/* -------------- Report Form -------------- */}
            <Modal
                open={openReport}
                setOpen={setOpenReport}
                className='md:max-w-md! w-[90%]! md:w-full!'>            
                <CreatorReportForm closeModal={() => setOpenReport(false)} />
            </Modal>

            {/* -------------- Report Form -------------- */}
            <Modal
                open={openReview}
                setOpen={setOpenReview}
                className='md:max-w-md! w-[90%]! md:w-full!'>
                <ReviewModal closeModal={() => setOpenReview(false)} />
            </Modal>
        </>
    )
}


export default PendingDropDown;