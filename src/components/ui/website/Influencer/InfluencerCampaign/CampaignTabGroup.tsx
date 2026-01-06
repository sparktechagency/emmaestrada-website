'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export const CampaignTabGroup = ({ tabs, queryParam }: any) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const defaultTab = tabs[0].value
  const [activeTab, setActiveTab] = useState(defaultTab)

  useEffect(() => {
    const paramValue = searchParams.get(queryParam)
    if (paramValue && tabs.some((t: any) => t.value === paramValue)) {
      setActiveTab(paramValue)
    } else {
      setActiveTab(defaultTab)
    }
  }, [searchParams, queryParam, tabs, defaultTab])

  const handleTabClick = (value: string) => {
    setActiveTab(value)
    const params = new URLSearchParams(searchParams.toString())
    params.set(queryParam, value)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    /* 1. Added 'w-full' to ensure it takes up available space.
      2. 'overflow-x-auto' allows swiping on mobile instead of cutting off.
      3. 'whitespace-nowrap' prevents labels from breaking into two lines.
      4. 'scrollbar-hide' (optional) makes it look cleaner.
    */
    <div className="w-full md:w-auto flex md:inline-block! mb-6 overflow-scroll no-scrollbar bg-secondary rounded-full p-1 whitespace-nowrap">
      {tabs.map((tab: any) => (
        <button
          key={tab.value}
          onClick={() => handleTabClick(tab.value)}          
          className={`shrink-0 flex-1 md:flex-none md:px-14 px-7 py-3   rounded-full transition-all duration-200 text-sm md:text-base font-medium ${
            activeTab === tab.value 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-white hover:bg-white/10'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}













// 'use client'
// import { useState, useEffect } from 'react'
// import { useRouter, useSearchParams, usePathname } from 'next/navigation'

// type Tab = {
//   label: string
//   value: string
// }

// type CampaignTabGroupProps = {
//   tabs: Tab[]
//   queryParam: string
// }

// export const CampaignTabGroup: React.FC<CampaignTabGroupProps> = ({
//   tabs,
//   queryParam,
// }) => {
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   const defaultTab = tabs[0].value
//   const [activeTab, setActiveTab] = useState(defaultTab)

//   useEffect(() => {
//     const paramValue = searchParams.get(queryParam)

//     const isValid = paramValue && tabs.some(t => t.value === paramValue)

//     if (isValid) {
//       setActiveTab(paramValue!)
//     } else {
//       // ✅ reset to first tab AND clean URL
//       setActiveTab(defaultTab)

//       const params = new URLSearchParams(searchParams.toString())
//       params.delete(queryParam)

//       router.replace(`${pathname}?${params.toString()}`, { scroll: false })
//     }
//   }, [searchParams, tabs, queryParam, pathname, router, defaultTab])

//   const handleTabClick = (value: string) => {
//     setActiveTab(value)

//     const params = new URLSearchParams(searchParams.toString())
//     params.set(queryParam, value)

//     router.push(`${pathname}?${params.toString()}`, { scroll: false })
//   }

//   return (
//     <div className="flex items-center justify-center md:inline-block mb-6 bg-secondary rounded-full p-1">
//       {tabs.map(tab => (
//         <button
//           key={tab.value}
//           onClick={() => handleTabClick(tab.value)}
//           className={`flex-1 sm:flex-none md:px-14 py-3 rounded-full transition-colors ${
//             activeTab === tab.value
//               ? 'bg-white text-gray-900'
//               : 'text-white'
//           }`}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   )
// }
