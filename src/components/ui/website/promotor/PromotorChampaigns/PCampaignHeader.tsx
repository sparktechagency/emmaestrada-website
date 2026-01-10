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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterModal from '../../Influencer/InfluencerCampaign/FilterModal';

const CampaignHeader = () => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const [sortBy, setSortBy] = useState("");

  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      params.set('searchTerm', searchValue);
    } else {
      params.delete('searchTerm');
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [searchValue]);



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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Campaign"
              className="pl-10 bg-white h-12"
            />
          </div>


          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => setFilterModalOpen(true)}
              className="bg-white h-12 sm:w-[300px]"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
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