'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { FilterValues } from '../InfluencerCampaign/FilterModal';

import { Input } from '@/components/ui/input';
import { ArrowUpDown, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreatorFilterModal from '@/components/shared/CreatorFilterModal';


const CreatorHeader = () => {  
  const [sortBy, setSortBy] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const handleApplyFilters = (filters: FilterValues) => {
    console.log("filters", filters)
  };

  return (
    <div className='mt-10'>
      <div className="mb-6">
        <h1 className={`mb-2 text-3xl font-semibold`}>Creator</h1>
        <p className="textPara">Discover artists and join their campaigns</p>
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
                <SelectItem value="followers">No of Follower</SelectItem>
                <SelectItem value="instagram-follower">Instragram Follower</SelectItem>
                <SelectItem value="youtube-follower">Youtube Follower</SelectItem>
                <SelectItem value="tiktok-followers">Tiktok Follower</SelectItem>                
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
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
      <CreatorFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        onApply={handleApplyFilters}
      />
    </div>
  )
}

export default CreatorHeader