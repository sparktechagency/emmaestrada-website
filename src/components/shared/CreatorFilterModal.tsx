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

interface CreatorFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (filters: any) => void;
}

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
      <DialogContent className="p-8 max-w-[900px] h-[80vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold">
            Filter Creators
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Narrow down creators using advanced filters
          </DialogDescription>
        </DialogHeader>

        {/* PLATFORM */}
        <div className="mt-5">
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
        <div className="mt-6">
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
        <div className="mt-6">
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
        <div className="mt-6">
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
        <div className="mt-6">
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
        <div className="mt-6">
          <p className="font-medium mb-2">Country</p>
          <input
            value={country}
            onChange={e => setCountry(e.target.value)}
            placeholder="Enter country"
            className="w-full h-12 border rounded-xl px-3"
          />
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
