// app/set-birthday/page.tsx
'use client'

import React, { useState } from 'react'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useData } from '@/hooks/context/DataContext'


const SetBirthday = () => {
  const router = useRouter()
  const [day, setDay] = useState<string | undefined>()
  const [month, setMonth] = useState<string | undefined>()
  const [year, setYear] = useState<string | undefined>()

  const {data, setData} = useData()


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data?.userName) {
      toast.error("First set username");
      router.push("/set-username");
      return;
    }
  if (day && month && year) {
  const monthIndex = months.indexOf(month);
  if (monthIndex === -1) return;

  const d = String(day).padStart(2, "0");
  const m = String(monthIndex + 1).padStart(2, "0");

  setData({birthday: `${year}-${m}-${d}` })

  router.push("/set-profile");
}

  }

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString())

  const isFormValid = day && month && year

  return (
    <div className="h-screen flex items-center justify-center bg-[url('/images/bgImg.png')] bg-cover bg-no-repeat bg-center ">
      <div className="backdrop-blur-[2.5px] border-2 border-white/20 rounded-xl p-5 sm:p-12">
        <Card className="w-full max-w-lg  sm:p-10">
          {/* Card Header */}
          <CardHeader className="flex flex-col items-center space-y-3">
            <h2 className="text-lg md:text-2xl font-bold text-center">What is your birthday?</h2>
            <p className="text-xs md:text-md text-center text-slate-500 font-sans">
              In order to give you the best experience on Whop, please enter your birthday.
            </p>
          </CardHeader>

          {/* Card Content */}
          <CardContent className="space-y-6 w-full ">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-row justify-between gap-3">
                {/* Day */}
                <Select onValueChange={setDay} value={day}>
                  <SelectTrigger className="md:flex-1 w-full md:w-[150px]">
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(d => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Month */}
                <Select onValueChange={setMonth}>
                  <SelectTrigger className="md:flex-1 w-full md:w-[150px]">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Year */}
                <Select onValueChange={setYear} value={year} >
                  <SelectTrigger className="md:flex-1 w-full md:w-[150px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {years.map(y => (
                      <SelectItem key={y} value={y}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={!isFormValid}>
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SetBirthday
