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
import { ArrowUpDown, Search } from 'lucide-react';


const CreatorHeader = () => {  
      const [visibility, setVisibility] = useState("all");
      const [sortBy, setSortBy] = useState("payout");     
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
              placeholder="Search campaigns or artists..."
              className="pl-10 bg-white h-12"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger className="w-full sm:w-[140px] bg-white h-12!">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[300px] bg-white h-12!">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payout">All Genre</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
          
        </div>
    )
}

export default CreatorHeader