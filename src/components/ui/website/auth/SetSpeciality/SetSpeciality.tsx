'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardHeader,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Music, Users, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

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

  const storedData = localStorage.getItem("registrationData");
  const image = localStorage.getItem("image");

  const registrationData = storedData ? JSON.parse(storedData) : null
  const { userName, birthday } = registrationData || {}

  const isValid = !!selected

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("preventDefault", selected);
    
    if (!userName) {
      toast.error("First set username")
      router.push("/set-username")
      return
    }

    if (!birthday) {
      toast.error("Please Set Birthday")
      router.push("/set-birthday")
      return
    }
    if (!image) {
      toast.error("Please select profile")
      router.push("/set-profile")
      return
    }


    // localStorage.setItem("registrationData", JSON.stringify(data))
    // router.push("/set-birthday")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/bgImg.png')] bg-cover bg-no-repeat bg-center px-4 py-8">
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
