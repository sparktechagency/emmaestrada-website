'use client'

import Image from 'next/image'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type LoginPopupProps = {
  open: boolean
  onClose: (v: boolean) => void
}

export function LoginPopup({ open, onClose }: LoginPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent
        className="
          min-w-4xl  p-0 overflow-hidden rounded-3xl
          bg-white shadow-2xl border-0
        "
      >
        <div className="flex flex-col md:flex-row">

          {/* LEFT – Illustration */}                  
            <Image
              src="https://images.unsplash.com/photo-1694355450046-ef2187e6e982?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Music Illustration"
              width={400}
              height={600}
              className="relative z-10  w-1/2 h-[500px] drop-shadow-xl object-cover center"
              priority
            />          

          {/* RIGHT – Content */}
          <div className="flex flex-col justify-center gap-6 px-6 py-2 sm:px-10 md:w-[55%]">
            {/* Badge */}
            <span
              className="
                w-fit rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider
                text-white
                bg-linear-to-r from-primary to-secondary
              "
            >
              Welcome
            </span>

            {/* Message */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary leading-tight">
                Please Create Account 🎶
              </h2>

              <p className="textPara">
                Join our music community to unlock exclusive campaigns,
                early releases, and artist-only content.
              </p>
            </div>

            {/* CTA */}
            <Link href="/login">
            <Button
              size="lg"
              className="
                mt-4 h-14 text-lg font-semibold rounded-2xl
                bg-linear-to-r from-primary to-secondary                
                shadow-lg hover:shadow-xl transition-all
              "
            >
              Log In to Continue
            </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
