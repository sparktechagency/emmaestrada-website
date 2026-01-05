"use client";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterModal from "./FilterModal";



const CampaignHeader = () => {
  const [activeCampaignTab, setActiveCampaignTab] = useState("campaigns");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  
  const [sortBy, setSortBy] = useState("all");
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');  
  
  const router = useRouter();
  const pathname = usePathname();
  const contentType = searchParams.get("campaignType") || "";

  
  useEffect(() => {
    const paramValue = searchParams.get("campaignType");
    if (paramValue && paramValue !== activeCampaignTab) {
      setActiveCampaignTab(paramValue);
    }
  }, []);

  const setCampaignType = (type: string) => {
    setActiveCampaignTab(type);
    router.push(`/creator?campaignType=${type}`);
  };



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
    <div className="pt-10">
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
          onClick={() => setCampaignType("my-submissions")}
          className={`flex-1 sm:flex-none md:px-14 py-3 rounded-full transition-colors ${activeCampaignTab === "my-submissions"
            ? "bg-white text-gray-900 "
            : " text-white"
            }`}
        >
          My Submissions
        </button>
      </div>
      
      {contentType !== "my-submissions" && <div className="bg-secondary rounded-xl p-4 mb-6">

      {/* <div className="bg-secondary hidden rounded-xl p-4 mb-6"> */}
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
           <div className="flex flex-col sm:flex-row gap-3 ">
            <Button
              variant="outline"
              onClick={() => setFilterModalOpen(true)}
              className="bg-white h-12 sm:w-[300px]"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>

            {/* <Select value={sortBy} onValueChange={setSortBy}>
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
                    e.stopPropagation();
                    setSortBy("");
                  }}
                >
                  Clear
                </Button>
              </SelectContent>
            </Select> */}
          </div>
        </div>
      {/* </div> */}
      </div>}

      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}        
      />
    </div>
  );
};

export default CampaignHeader;
