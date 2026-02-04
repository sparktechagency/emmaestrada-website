'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { countriesData } from "@/assets/countrydata";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { myFetch } from "@/utils/myFetch";

interface CreatorFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Country = {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
};

export default function CreatorFilterModal({
  open,
  onOpenChange,
}: CreatorFilterModalProps) {
  // Define initial values as constants
  const INITIAL_RATING = [1, 5];
  const INITIAL_FOLLOWERS = [0, 100000];


  const [gender, setGender] = useState<string>("");
  const [rating, setRating] = useState<number[]>(INITIAL_RATING);
  const [followers, setFollowers] = useState<number[]>(INITIAL_FOLLOWERS);
  const [platform, setPlatform] = useState<string>(""); // Changed to single platform
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const platformList = [
  { label: "tiktok", value: "tiktok", icon: "/tiktokBlack.png" },
  { label: "instagram", value: "instagram", icon: "/instagram.png" },
  { label: "youtube", value: "youtube", icon: "/youtube.png" },
];

  const [openDropdown, setOpenDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper function to check if range has changed from initial
  const hasRangeChanged = (current: number[], initial: number[]) => {
    return current[0] !== initial[0] || current[1] !== initial[1];
  };

  const addCountry = (iso2: string) => {
    const country = countriesData.find(c => c.iso2 === iso2);
    if (!country) return;

    // Prevent duplicates
    if (selectedCountries.some(c => c.iso2 === iso2)) return;

    setSelectedCountries(prev => [...prev, country]);
    setSearch(""); // Clear search after adding
  };



  const fetchingGCategories = async () => {
    try {
      const genres = await myFetch('/categories?type=USER');
      const uCatagory = genres?.data?.map((cat: any) => cat?.name)
      setCategories(uCatagory)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchingGCategories();
  }, [])


  const filteredCountries = countriesData.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const setFiltersAsSearchParams = (filters: any) => {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.gender) {
      params.set('gender', filters?.gender?.toLowerCase());
    } else {
      params.delete('gender');
    }

    // Single platform
    if (filters.platform) {
      params.set('platform', filters.platform);
    } else {
      params.delete('platform');
    }

    if (filters.countries && filters.countries.length > 0) {
      params.set('countries', filters.countries.join(','));
    } else {
      params.delete('countries');
    }

    if (filters.selectedCategories && filters.selectedCategories.length > 0) {
      params.set('categories', filters.selectedCategories.join(','));
    } else {
      params.delete('categories');
    }

    // Handle range values - only add if changed from initial
    if (filters.followers && hasRangeChanged(filters.followers, INITIAL_FOLLOWERS)) {
      params.set('followersMin', filters.followers[0].toString());
      params.set('followersMax', filters.followers[1].toString());
    } else {
      params.delete('followersMin');
      params.delete('followersMax');
    }

    if (filters.rating && hasRangeChanged(filters.rating, INITIAL_RATING)) {
      params.set('ratingMin', filters.rating[0].toString());
      params.set('ratingMax', filters.rating[1].toString());
    } else {
      params.delete('ratingMin');
      params.delete('ratingMax');
    }

    // Update URL
    router.push(`${pathname}?${params.toString()}`);
  };

  const removeCountry = (iso2: string) => {
    setSelectedCountries(prev =>
      prev.filter(c => c.iso2 !== iso2)
    );
  };

  const toggleItem = (list: string[], setList: any, item: string) => {
    setList((prev: string[]) =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const selectSinglePlatform = (item: string) => {
    setPlatform(prev => prev === item ? "" : item);
  };

  const apply = () => {
    const filterData = {
      platform,
      selectedCategories,
      gender,
      rating,
      followers,
      countries: selectedCountries.map(c => c.name), // Send ISO2 codes
    };

    setFiltersAsSearchParams(filterData);
    onOpenChange(false);
  };

  const clear = () => {
    setPlatform("");
    setSelectedCategories([]);
    setGender("");
    setRating(INITIAL_RATING);
    setFollowers(INITIAL_FOLLOWERS);
    setSelectedCountries([]);

    // Clear URL params
    router.push(pathname);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-8 max-w-[900px] h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold">
            Filter Creators
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Narrow down creators using advanced filters
          </DialogDescription>
        </DialogHeader>

        {/* PLATFORM - Single Selection */}
        <div className="my-3">
          <p className="font-medium mb-3">Platform (Select One)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {platformList.map(p => (
              <div
                key={p.value}
                className="flex items-center justify-center gap-1 border rounded-xl p-3"
              >
                <Checkbox
                  checked={platform === p.value}
                  onCheckedChange={() => selectSinglePlatform(p.value)}
                />
                <img src="" alt=""/>
                <Image src={p.icon} height={20} width={20} alt="logo" />
                <span className="capitalize text-sm">{p.label}</span>
              </div>
            ))}
          </div>


        </div>

        {/* FOLLOWERS */}
        <div className="">
          <p className="font-medium mb-2">
            Followers: {followers[0].toLocaleString()} - {followers[1].toLocaleString()}
          </p>
          <Slider
            disabled={!platform}
            value={followers}
            min={0}
            max={100000}
            step={1000}
            onValueChange={setFollowers}
            className={!hasRangeChanged(followers, INITIAL_FOLLOWERS) ? 'opacity-50' : ''}
          />
          {!platform && (
            <p className="text-xs text-red-500 mt-1">Select a platform to enable this filter</p>
          )}
        </div>

        {/* CATEGORY */}
        <div className="mt-3">
          <p className="font-medium mb-3">Category</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories?.map(cat => (
              <button
                key={cat}
                onClick={() => toggleItem(categories, setSelectedCategories, cat)}
                className={`border rounded-xl py-2 text-sm transition-colors ${selectedCategories.includes(cat)
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-50"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GENDER */}
        <div className="mt-3">
          <p className="font-medium mb-2">Gender</p>
          <select
            value={gender}
            onChange={e => setGender(e.target.value)}
            className="w-full h-12 border rounded-xl px-3"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* RATING */}
        <div className="">
          <p className="font-medium mb-2">
            Rating: {rating[0]} - {rating[1]} ⭐
          </p>
          <Slider
            value={rating}
            min={1}
            max={5}
            step={1}
            onValueChange={setRating}
            className={!hasRangeChanged(rating, INITIAL_RATING) ? 'opacity-50' : ''}
          />
        </div>

        {/* COUNTRY */}
        <div className="flex flex-col gap-3">
          <p className="font-medium">Country</p>

          {/* Selected Countries Display */}
          <div className="flex w-full min-h-12 flex-wrap items-center gap-2 rounded-xl border px-3 py-2">
            {selectedCountries.length === 0 && (
              <span className="text-sm text-muted-foreground">
                Select countries
              </span>
            )}

            {selectedCountries.map(country => (
              <span
                key={country.iso2}
                className="bg-primary/80 text-xs flex items-center gap-2 text-white rounded-full px-3 py-1"
              >
                <Image
                  src={country.flag}
                  alt={country.name}
                  width={16}
                  height={12}
                  className="rounded-sm"
                />
                {country.name}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-red-300"
                  onClick={() => removeCountry(country.iso2)}
                />
              </span>
            ))}
          </div>

          {/* Country Dropdown */}
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => setOpenDropdown(v => !v)}
              className="h-12 w-full rounded-xl border px-3 flex items-center justify-between hover:bg-gray-50"
            >
              Add country
              {openDropdown ? <X  className="h-4 w-4 text-red-600" /> : <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${openDropdown ? 'rotate-180' : ''}`} />}
            </button>

            {openDropdown && (
              <div className="absolute z-50 mt-1 w-full rounded-xl border bg-background shadow-lg">
                <input
                  autoFocus
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search country..."
                  className="w-full border-b px-3 py-2 text-sm outline-none"
                />

                <div className="max-h-60 overflow-auto">
                  {filteredCountries.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      No countries found
                    </div>
                  ) : (
                    filteredCountries.map(country => (
                      <div
                        key={country.iso2}
                        onClick={() => {
                          addCountry(country.iso2);
                          setOpenDropdown(false);
                        }}
                        className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-accent"
                      >
                        <img
                          src={country.flag.trim()}
                          alt={country.name}
                          className="h-3.5 w-5 rounded-sm"
                        />
                        {country.name}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
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
            Show Results
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}