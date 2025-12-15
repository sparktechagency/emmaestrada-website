"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { CircleAlert, Menu } from "lucide-react"
import { useState } from "react"

import Modal from "@/components/modals/Modal"
import CreatorReportForm from "@/components/shared/CreatorReportForm"
import ReviewModal from "@/components/shared/ReviewModal"
import { IoIosStar } from "react-icons/io"

const RejectDropdown = () => {    
    const [openReport, setOpenReport] = useState(false);
    const [openReview, setOpenReview] = useState(false);

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


export default RejectDropdown;