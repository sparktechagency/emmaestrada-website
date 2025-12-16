'use client'
import React, { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ArrowUpDown, Music, Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { bricolage } from '@/constants/bricolage';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterModal, { FilterValues } from './FilterModal';


const CampaignHeader = () => {

  const [activeCampaignTab, setActiveCampaignTab] = useState("campaigns");
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const [visibility, setVisibility] = useState("all");
  const [sortBy, setSortBy] = useState("all");
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const paramValue = searchParams.get('campaignType')
    if (paramValue && paramValue !== activeCampaignTab) {
      setActiveCampaignTab(paramValue)
    }
  }, [])

  const setCampaignType = (type: string) => {
    setActiveCampaignTab(type)
    router.push(`/creator?campaignType=${type}`)
  }



  const handleApplyFilters = (filters: FilterValues) => {

    console.log("filters", filters)
  };

  return (
    <div className='pt-10'>
      <div className="mb-6">
        <h1 className={`mb-2 text-3xl font-semibold`}>Campaigns</h1>
        <p className="textPara">Browse and join music campaigns</p>
      </div>

      {/* Campaign Tabs */}
      <div className="flex items-center justify-center md:inline-block mb-6  bg-secondary rounded-full p-1">
        <button
          onClick={() => setCampaignType("campaigns")}
          className={`flex-1 sm:flex-none md:px-14 py-3 rounded-full transition-colors ${activeCampaignTab === "campaigns"
            ? "bg-white text-gray-900 "
            : " text-white"
            }`}
        >
          Campaigns
        </button>
        <button
          onClick={() => setCampaignType("my-campaigns")}
          className={`flex-1 sm:flex-none md:px-14 py-3 rounded-full transition-colors ${activeCampaignTab === "my-campaigns"
            ? "bg-white text-gray-900 "
            : " text-white"
            }`}
        >
          My campaigns
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-secondary rounded-xl p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search creator..."
              className="pl-10 bg-white h-12"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => setFilterModalOpen(true)}
              className="bg-white h-12"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[300px] bg-white h-12!">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="followers">No of Followers</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <Button
                  className="w-full px-2"
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSortBy("")                    
                  }}
                >
                  Clear
                </Button>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    
      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        onApply={handleApplyFilters}
      />
    </div>
  )
}

export default CampaignHeader