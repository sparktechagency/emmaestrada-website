'use client'

import Modal from '@/components/modals/Modal'
import ReviewModal from '@/components/shared/ReviewModal'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const ReviewButtonWithModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Rating</Button>

      <Modal
        open={open}
        setOpen={setOpen}
        
        className='md:max-w-md! w-[90%]! md:w-full!'
      >
        <ReviewModal closeModal={() => setOpen(false)} />
      </Modal>
    </>
  )
}

export default ReviewButtonWithModal
