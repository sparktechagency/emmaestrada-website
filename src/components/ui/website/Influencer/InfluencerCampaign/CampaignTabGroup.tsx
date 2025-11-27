'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

type Tab = {
  label: string
  value: string
}

type CampaignTabGroupProps = {
  tabs: Tab[]
  queryParam: string
}

export const CampaignTabGroup: React.FC<CampaignTabGroupProps> = ({
  tabs,
  queryParam,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const defaultTab = tabs[0].value
  const [activeTab, setActiveTab] = useState(defaultTab)

  useEffect(() => {
    const paramValue = searchParams.get(queryParam)

    const isValid = paramValue && tabs.some(t => t.value === paramValue)

    if (isValid) {
      setActiveTab(paramValue!)
    } else {
      // ✅ reset to first tab AND clean URL
      setActiveTab(defaultTab)

      const params = new URLSearchParams(searchParams.toString())
      params.delete(queryParam)

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }, [searchParams, tabs, queryParam, pathname, router, defaultTab])

  const handleTabClick = (value: string) => {
    setActiveTab(value)

    const params = new URLSearchParams(searchParams.toString())
    params.set(queryParam, value)

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center justify-center md:inline-block mb-6 bg-secondary rounded-full p-1">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => handleTabClick(tab.value)}
          className={`flex-1 sm:flex-none md:px-14 py-3 rounded-full transition-colors ${
            activeTab === tab.value
              ? 'bg-white text-gray-900'
              : 'text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
