'use client'
import Modal from '@/components/modals/Modal'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import RejectSubmissionModal from './RejectSubmissionModal'

const RejectButtonWithForm = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Modal
                // dialogTitle="Rejection Submittion"
                open={open}
                setOpen={setOpen}
                width="600px"                
                dialogTrigger={
                    <Button variant="destructive" className="ml-3">Reject</Button>
                }
            >
                <RejectSubmissionModal closeModal={()=>setOpen(false)} />
            </Modal>
        </>
    )
}

export default RejectButtonWithForm