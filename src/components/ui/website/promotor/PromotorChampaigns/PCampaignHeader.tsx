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
import FilterModal from "../../Influencer/InfluencerCampaign/FilterModal";



const PCampaignHeader = () => {
  const [activeCampaignTab, setActiveCampaignTab] = useState("campaigns");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
    
  const [searchValue, setSearchValue] = useState('');  
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Query params
  const params = Object.fromEntries(searchParams?.entries());
  const {contentType, status, searchTerm,  ...filterParams} = params;

  const hasFilters = Object.keys(filterParams)?.length > 0;
  useEffect(() => {
    const paramValue = searchParams.get("campaignType");
    if (paramValue && paramValue !== activeCampaignTab) {
      setActiveCampaignTab(paramValue);
    }
  }, []);

  const setCampaignType = (type: string) => {
    setActiveCampaignTab(type);
    router.push(`/promotor?campaignType=${type}`);
  };


  const clearAllParams = () => {
    router.replace(pathname, { scroll: false });
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
      {/* <div className="flex items-center justify-center md:inline-block mb-6  bg-secondary rounded-full p-1">
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
      </div> */}
      
      {contentType !== "my-submissions" && <div className="bg-secondary rounded-xl p-4 mb-6">

      {/* <div className="bg-secondary hidden rounded-xl p-4 mb-6"> */}
        <div className="flex flex-col md:flex-row gap-4">
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
          
           <div className="flex flex-col sm:flex-row gap-3 ">
            {hasFilters ?

              <Button
                variant="outline"
                onClick={() => clearAllParams()}
                className="bg-white h-12 md:w-[200px] lg:w-[300px]"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
              :
              <Button
                variant="outline"
                onClick={() => setFilterModalOpen(true)}
                className="bg-white h-12 md:w-[200px] lg:w-[300px]"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>


            }           
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

export default PCampaignHeader;
