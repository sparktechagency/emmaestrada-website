import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { myFetch } from "@/utils/myFetch";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FilterModal({ open, onOpenChange, }: FilterModalProps) {
  // Move hooks to component level
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [contentType, setContentType] = useState("");
  const [genres, setGenres] = useState<string[]>([]);


  const [categories, setCategories] = useState<string[]>([]);
  const [selectPlatform, setSelectPlatform] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])


  const fetchingCategories = async () => {
    try {
      const category = await myFetch('/categories?type=CATEGORY');
      const uCatagory = category?.data?.map((cat: any) => cat?.name)
      setCategories(uCatagory)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const fetchingGenries = async () => {
    try {
      const genres = await myFetch('/categories?type=GENRE');
      const uCatagory = genres?.data?.map((cat: any) => cat?.name)
      setGenres(uCatagory)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchingCategories();
    fetchingGenries()
  }, [])

  const platformList = [
    { name: "TikTok", icon: "/tiktokBlack.png" },
    { name: "Instagram", icon: "/instagram.png" },
    { name: "YouTube", icon: "/youtube.png" }
  ];

  // Define initial values as constants
  const INITIAL_BUDGET = [0, 10000];
  const INITIAL_FLAT_FEE = [0, 200];

  const INITIAL_MIN_PAYOUT = [0, 200];
  const INITIAL_REWARD_RATE = [0, 50];
  const INITIAL_MAX_PAYOUT = [0, 1000];
  {/*  const INITIAL_TIKTOK_FOLLOWERS = [0, 100000];
  const INITIAL_INSTAGRAM_FOLLOWERS = [0, 100000];
  const INITIAL_YOUTUBE_FOLLOWERS = [0, 100000];
  */}
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [flatFee, setFlatFee] = useState(INITIAL_FLAT_FEE);

  const [minPayout, setMinPayout] = useState(INITIAL_MIN_PAYOUT);
  const [rewardRate, setRewardRate] = useState(INITIAL_REWARD_RATE);
  const [maxPayout, setMaxPayout] = useState(INITIAL_MAX_PAYOUT);
  /*
    const [tiktokFollowers, setTiktokFollowers] = useState(INITIAL_TIKTOK_FOLLOWERS);
    const [instagramFollowers, setInstagramFollowers] = useState(INITIAL_INSTAGRAM_FOLLOWERS);
    const [youtubeFollowers, setYoutubeFollowers] = useState(INITIAL_YOUTUBE_FOLLOWERS);
    */

  const hasRangeChanged = (current: number[], initial: number[]) => {
    return current[0] !== initial[0] || current[1] !== initial[1];
  };

  // Now this function can access the hooks from component scope
  const setFiltersAsSearchParams = (filters: any) => {
    const params = new URLSearchParams(searchParams.toString());

    // Handle simple string values
    if (filters.visibility) {
      params.set('visibility', filters.visibility);
    }
    if (filters.contentType) {
      params.set('contentType', filters.contentType);
    } else if (!filters.visibility) {
      params.delete('contentType');
    }

    // Handle array values (join with comma)
    if (filters.selectedGenres && filters.selectedGenres.length > 0) {
      params.set('selectedGenres', filters.selectedGenres.join(','));
    } else {
      params.delete('selectedGenres');
    }

    if (filters.selectedCategories && filters.selectedCategories.length > 0) {
      params.set('selectedCategories', filters.selectedCategories.join(','));
    } else {
      params.delete('selectedCategories');
    }

    if (filters.selectPlatform && filters.selectPlatform.length > 0) {
      params.set('platforms', filters.selectPlatform);
    } else {
      params.delete('platforms');
    }

    // Handle range values (min-max) - only add if changed from initial
    if (filters.budget && hasRangeChanged(filters.budget, INITIAL_BUDGET)) {
      params.set('campaignBudgetMin', filters.budget[0].toString());
      params.set('campaignBudgetMax', filters.budget[1].toString());
    } else {
      params.delete('campaignBudgetMin');
      params.delete('campaignBudgetMax');
    }

    if (filters.flatFee && hasRangeChanged(filters.flatFee, INITIAL_FLAT_FEE)) {
      params.set('flatFeeMin', filters.flatFee[0].toString());
      params.set('flatFeeMax', filters.flatFee[1].toString());
    } else {
      params.delete('flatFeeMin');
      params.delete('flatFeeMax');
    }

    if (filters.minPayout && hasRangeChanged(filters.minPayout, INITIAL_MIN_PAYOUT)) {
      params.set('minPayoutMin', filters.minPayout[0].toString());
      params.set('minPayoutMax', filters.minPayout[1].toString());
    } else {
      params.delete('minPayoutMin');
      params.delete('minPayoutMax');
    }

    if (filters.rewardRate && hasRangeChanged(filters.rewardRate, INITIAL_REWARD_RATE)) {
      params.set('rewardRateMin', filters.rewardRate[0].toString());
      params.set('rewardRateMax', filters.rewardRate[1].toString());
    } else {
      params.delete('rewardRateMin');
      params.delete('rewardRateMax');
    }

    if (filters.maxPayout && hasRangeChanged(filters.maxPayout, INITIAL_MAX_PAYOUT)) {
      params.set('maxPayoutMin', filters.maxPayout[0].toString());
      params.set('maxPayoutMax', filters.maxPayout[1].toString());
    } else {
      params.delete('maxPayoutMin');
      params.delete('maxPayoutMax');
    }

    // Update URL
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleItem = (list: string[], setList: (fn: (prev: string[]) => string[]) => void, item: string) => {
    setList((prev) => prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]);
  };

  const apply = () => {
    const filters = {
      contentType,
      selectedCategories,
      selectedGenres,
      selectPlatform,
      budget,
      flatFee,
      minPayout,
      rewardRate,
      maxPayout
    };

    setFiltersAsSearchParams(filters);
    onOpenChange(false);
  };

  const clear = () => {
    setContentType("");
    setSelectedGenres([]);
    setSelectedCategories([]);
    setSelectPlatform("");
    setBudget(INITIAL_BUDGET);
    setFlatFee(INITIAL_FLAT_FEE);
    setMinPayout(INITIAL_MIN_PAYOUT);
    setRewardRate(INITIAL_REWARD_RATE);
    setMaxPayout(INITIAL_MAX_PAYOUT);
    {/*setTiktokFollowers(INITIAL_TIKTOK_FOLLOWERS);
    setInstagramFollowers(INITIAL_INSTAGRAM_FOLLOWERS);
    setYoutubeFollowers(INITIAL_YOUTUBE_FOLLOWERS);
    */}
    // Clear URL params
    router.push(pathname);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-8 w-full max-w-[1000px]! h-[80vh]! overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold">Filter Campaigns</DialogTitle>
          <DialogDescription className="text-gray-500 text-sm">
            Refine your search with advanced filters
          </DialogDescription>
        </DialogHeader>

        <div>
          <label className="text-sm font-medium">Content Type</label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="mt-2 w-full h-12 border rounded-xl px-3"
          >
            {/* <option value="" disabled hidden> */}
            <option value=""  >
              Select
            </option>
            <option value="UGC">UGC</option>
            <option value="Clipping">Clipping</option>
          </select>
        </div>

        {/* MUSIC GENRE */}
        <div className="mt-5">
          <p className="font-medium mb-3">Music Genre</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {genres && genres?.map(g => (
              <button
                key={g}
                onClick={() => toggleItem(genres, setSelectedGenres, g)}
                className={`border rounded-xl py-2 transition-colors ${selectedGenres.includes(g) ? "bg-black text-white" : "bg-white hover:bg-gray-50"
                  }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* CATEGORY */}
        <div className="mt-5">
          <p className="font-medium mb-3">Category</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories?.map(cat => (
              <button
                key={cat}
                onClick={() => toggleItem(categories, setSelectedCategories, cat)}
                className={`border rounded-xl py-2 transition-colors ${selectedCategories.includes(cat) ? "bg-black text-white" : "bg-white hover:bg-gray-50"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PLATFORM */}
        <div className="mt-5">
          <p className="font-medium mb-3">Platform</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {platformList.map(p => (
              <div key={p.name} className="flex items-center gap-3 border rounded-xl p-4">
                <Checkbox
                  checked={selectPlatform === p.name}
                  onCheckedChange={() => setSelectPlatform(selectPlatform === p.name ? "" : p.name)}
                />
                <img src={p.icon} alt={p.name} className="w-8 h-8" />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="pb-3">Flat Fee: ${flatFee[0]} - ${flatFee[1]}</p>
          <Slider
            value={flatFee}
            min={0}
            max={200}
            onValueChange={setFlatFee}
            className={!hasRangeChanged(flatFee, INITIAL_FLAT_FEE) ? 'opacity-50' : ''}
          />
        </div>

        {/* SLIDERS */}
        <p className="font-medium mt-5">Budget</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="pb-3">Campaign Budget: ${budget[0]} - ${budget[1]}</p>
            <Slider
              value={budget}
              min={0}
              max={10000}
              step={100}
              onValueChange={setBudget}
              className={!hasRangeChanged(budget, INITIAL_BUDGET) ? 'opacity-50' : ''}
            />
          </div>
          <div>
            <p className="pb-3">Minimum Payout: ${minPayout[0]} - ${minPayout[1]}</p>
            <Slider
              value={minPayout}
              min={0}
              max={200}
              onValueChange={setMinPayout}
              className={!hasRangeChanged(minPayout, INITIAL_MIN_PAYOUT) ? 'opacity-50' : ''}
            />
          </div>
          <div>
            <p className="pb-3">Reward Rate / 1000 views: ${rewardRate[0]} - ${rewardRate[1]}</p>
            <Slider
              value={rewardRate}
              min={0}
              max={50}
              onValueChange={setRewardRate}
              className={!hasRangeChanged(rewardRate, INITIAL_REWARD_RATE) ? 'opacity-50' : ''}
            />
          </div>
          <div>
            <p className="pb-3">Maximum Payout: ${maxPayout[0]} - ${maxPayout[1]}</p>
            <Slider
              value={maxPayout}
              min={0}
              max={1000}
              onValueChange={setMaxPayout}
              className={!hasRangeChanged(maxPayout, INITIAL_MAX_PAYOUT) ? 'opacity-50' : ''}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between mt-10">
          <Button
            variant="outline"
            className="h-12 w-40 rounded-full"
            onClick={clear}
          >
            Clear filters
          </Button>
          <Button
            className="bg-orange-500 h-12 w-40 rounded-full text-white hover:bg-orange-600"
            onClick={apply}
          >
            Search result
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}