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
import FilterModal from '../../Influencer/InfluencerCampaign/FilterModal';

const CampaignHeader = () => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  
  const [sortBy, setSortBy] = useState("");

  const searchParams = useSearchParams()
  const status = searchParams.get('status')

  return (
    <div className='pt-10'>
      <div className="mb-6">
        <h1 className={`mb-2 text-3xl font-semibold`}>Campaigns</h1>
        <p className="textPara">Browse and join music campaigns</p>
      </div>


      {status !== 'create-campaign' && <div className="bg-secondary rounded-xl p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search campaigns"
              className="pl-10 bg-white h-12"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              disabled={status === "upcoming" || status === "completed"}
              onClick={() => setFilterModalOpen(true)}
              className="bg-white h-12"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>

            <Select disabled={status === "upcoming" || status === "completed"} value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[300px] bg-white h-12!">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
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
      </div>}

      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
      />
    </div>
  )
}

export default CampaignHeader