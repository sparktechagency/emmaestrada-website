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
import { useState } from "react";
import { countriesData } from "@/assets/countrydata";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface CreatorFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (filters: any) => void;
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
  onApply,
}: CreatorFilterModalProps) {

  const [categories, setCategories] = useState<string[]>([]);
  const [gender, setGender] = useState<string>("Both");
  const [rating, setRating] = useState<number[]>([1, 5]);
  const [followers, setFollowers] = useState<number[]>([0, 1000000]);
  const [country, setCountry] = useState("");
  const [selectPlatform, setSelectPlatform] = useState(false)
  const platformList = ["TikTok", "Instagram", "YouTube"];
  const [platforms, setPlatforms] = useState<string[]>([]);

  const categoryList = [
    "Lifestyle",
    "Beauty",
    "Fitness",
    "Gaming",
    "Music",
    "Comedy",
    "Education",
  ];

  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const addCountry = (iso2: string) => {
    const country = countriesData.find(c => c.iso2 === iso2);
    if (!country) return;

    setSelectedCountries(prev => [...prev, country]);
  };


  const filteredCountries = countriesData.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

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
    setPlatforms(prev =>
      prev[0] === item ? [] : [item] // click again to unselect
    );
  };

  const apply = () => {
    onApply({
      platforms,
      categories,
      gender,
      rating,
      followers,
      country,
    });
    onOpenChange(false);
  };

  const clear = () => {
    setPlatforms([]);
    setCategories([]);
    setGender("Both");
    setRating([1, 5]);
    setFollowers([0, 1000000]);
    setCountry("");
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

        {/* PLATFORM */}
        <div className="my-3">
          <p className="font-medium mb-3">Platform</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platformList.map(p => (
              <div
                key={p}
                className="flex items-center gap-3 border rounded-xl p-4"
              >
                <Checkbox
                  checked={platforms.includes(p)}
                  onCheckedChange={() => selectSinglePlatform(p)}
                />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>


        {/* FOLLOWERS */}
        <div className="">
          <p className="font-medium mb-2">
            Followers: {followers[0]} - {followers[1]}
          </p>
          <Slider
            disabled={platforms?.length < 1}
            value={followers}
            min={0}
            max={1000000}
            step={1000}
            onValueChange={setFollowers}
          />
        </div>

        {/* CATEGORY */}
        <div className="mt-3">
          <p className="font-medium mb-3">Category</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categoryList.map(cat => (
              <button
                key={cat}
                onClick={() => toggleItem(categories, setCategories, cat)}
                className={`border rounded-xl py-2 text-sm ${categories.includes(cat)
                  ? "bg-black text-white"
                  : "bg-white"
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
            <option>Both</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* RATING */}
        <div className="">
          <p className="font-medium mb-2">
            Rating: {rating[0]} - {rating[1]}
          </p>
          <Slider
            value={rating}
            min={1}
            max={5}
            step={1}
            onValueChange={setRating}
          />
        </div>

        {/* COUNTRY */}
        <div className="flex flex-col gap-3">
          {/* Chips Input (3/5 width) */}
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
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeCountry(country.iso2)}
                />
              </span>
            ))}
          </div>

          <div className="relative w-full">
            <button
              type="button"
              onClick={() => setOpenDropdown(v => !v)}
              className="h-12 w-full rounded-xl border px-3 flex items-center justify-between"
            >
              Add country
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>

            {openDropdown && (
              <div className="absolute  z-50 mt-1 w-full rounded-xl border bg-background shadow-lg">
                <input
                  autoFocus
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search country..."
                  className="w-full border-b px-3 py-2 text-sm outline-none"
                />

                <div className="max-h-20 overflow-auto">
                  {filteredCountries.map(country => (
                    <div
                      key={country.iso2}
                      onClick={() => addCountry(country.iso2)}
                      className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-accent"
                    >
                      <img
                        src={country.flag.trim()}
                        className="h-3.5 w-5 rounded-sm"
                      />
                      {country.name}
                    </div>
                  ))}
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
            className="bg-orange-500 h-12 w-40 rounded-full text-white"
            onClick={apply}
          >
            Show Results
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
