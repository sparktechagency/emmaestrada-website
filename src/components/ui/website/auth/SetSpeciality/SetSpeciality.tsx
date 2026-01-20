'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Music, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const options = [
  {
    value: 'promotor',
    title: 'Music Promotor',
    desc: 'Create and release original music',
    icon: Music,
  },
  {
    value: 'creator',
    title: 'Music Creator',
    desc: 'Promote music and trends online',
    icon: Users,
  },
  {
    value: 'both',
    title: 'Both',
    desc: 'Create and promotor together',
    icon: Sparkles,
  },
]

export default function SetSpeciality() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | undefined>()


  const isValid = !!selected

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // router.push("/set-birthday")
  }

  return (
        <div className="min-h-screen flex items-center justify-center relative px-4 py-8">
          {/* Optimized Background Image */}
          <Image
            src="/images/bgImg.png"
            alt="Background"
            fill
            priority
            quality={85}
            className="object-cover -z-10"
            sizes="100vw"
          />
      <div className="backdrop-blur-[2.5px] md:w-2/5 border-2 border-white/20 rounded-xl p-3 sm:p-12">
        <Card className="w-full p-4 sm:p-10">
          {/* Header */}
          <CardHeader className="flex flex-col items-center space-x-1 md:space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-center">
              What best describes you?
            </h2>
            <p className="text-sm md:text-md text-center text-slate-500 font-sans">
              Help us personalize your experience
            </p>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-2">
              {options.map((opt) => {
                const Icon = opt.icon
                return (
                  <div
                    key={opt.value}
                    onClick={() => setSelected(opt.value)}
                    className={cn(
                      'text-center border rounded-lg cursor-pointer transition p-2 md:py-3 md:px-5',
                      selected === opt.value
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:bg-gray-50'
                    )}
                  >
                    <Icon className=" text-primary mx-auto mb-3 text-2xl md:text-4xl" />
                    <div>
                      <p className="font-semibold whitespace-nowrap mb-2">{opt.title}</p>
                      <p className="text-sm text-gray-600">{opt.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <Button
              size="lg"
              className="w-full mt-6"
              disabled={!isValid}              
            >
              Continue
            </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
