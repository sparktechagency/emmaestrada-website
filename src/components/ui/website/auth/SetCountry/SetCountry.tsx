'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Card,
    CardHeader,
    CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover'
import {
    Command,
    CommandInput,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { countriesData } from '@/assets/countrydata'
import { toast } from 'sonner'
import { useData } from '@/hooks/context/DataContext'
import Image from 'next/image'


export default function SetCountry() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<{
        name: string
        iso2: string
        flag: string
    } | null>(null)

    const {data, image, setData} = useData()

    const isValid = !!selected

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!data?.userName) {
            toast.error("First set username")
            router.push("/set-username")
            return
        }

        if (!data?.birthday) {
            toast.error("Please Set Birthday")
            router.push("/set-birthday")
            return
        }
        if (!image) {
            toast.error("Please select profile")
            router.push("/set-profile")
            return
        }

        setData({ country: selected?.name})        
        router.push('/businessname')
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
            <div className="backdrop-blur-[2.5px] border-2 border-white/20 rounded-xl p-4 sm:p-12">
                <Card className="w-full md:min-w-lg py-4 sm:p-10">
                    <CardHeader className="flex flex-col items-center space-y-3">
                        <h2 className="text-2xl font-bold text-center">
                            Select your country
                        </h2>
                        <p className="text-md text-center text-slate-500 font-sans">
                            This helps us personalize your experience
                        </p>
                    </CardHeader>

                    {/* Content */}
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit}>

                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="h-12 w-full justify-between"
                                    >
                                        {selected ? (
                                            <span className="flex items-center gap-2">
                                                <img
                                                    src={selected.flag}
                                                    alt={selected.name}
                                                    className="w-5 h-4 object-cover rounded-sm"
                                                />
                                                {selected.name}
                                            </span>
                                        ) : (
                                            'Choose your country'
                                        )}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                {/* ✅ WIDTH FIX */}
                                <PopoverContent className="p-0 w-full max-w-[300px] md:max-w-[500px]">
                                    <Command>
                                        <CommandInput placeholder="Search country..." />

                                        <CommandEmpty>No country found.</CommandEmpty>

                                        <CommandGroup className="max-h-64 overflow-y-auto">
                                            {countriesData.map((country) => (
                                                <CommandItem
                                                    key={country.iso2}
                                                    /* ✅ UNIQUE SEARCH VALUE */
                                                    value={`${country.name}-${country.iso2}`}
                                                    onSelect={() => {
                                                        setSelected(country)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={country.flag}
                                                            alt={country.name}
                                                            className="w-5 h-4 rounded-sm object-cover"
                                                        />
                                                        <span>{country.name}</span>
                                                    </div>

                                                    <Check
                                                        className={cn(
                                                            'ml-auto h-4 w-4',
                                                            selected?.iso2 === country.iso2
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>


                            {/* Submit */}
                            <Button
                                size="lg"
                                className="w-full mt-5"
                                disabled={!isValid}
                            >
                                Select Country
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
