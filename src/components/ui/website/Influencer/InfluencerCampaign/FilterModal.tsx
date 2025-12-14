import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";


interface FilterModalProps { open: boolean; onOpenChange: (open: boolean) => void; onApply: (filters: any) => void; }

export interface FilterValues { genres: string[]; payoutRange: { min: string; max: string }; campaignType: string[]; platforms: string[]; }

export default function FilterModal({ open, onOpenChange, onApply }: FilterModalProps) {
  const [visibility, setVisibility] = useState("Both");
  const [contentType, setContentType] = useState("UGC");
  const [genres, setGenres] = useState([]);
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  const musicGenres = [
    "Pop", "Rock", "R&B", "Jazz", "EDM", "Electronic", "Hip-Hop", "Indie", "Country", "Classical"
  ];

  const categoryList = [
    "Lifestyle", "Beauty & Fashion", "Fitness & Health", "Food & Cooking", "Travel", "Entertainment", "Gaming", "Art & Creativity", "Comedy"
  ];

  const platformList = [
    { name: "TikTok", icon: "/tiktokBlack.png" },
    { name: "Instagram", icon: "/instagram.png" },
    { name: "YouTube", icon: "/youtube.png" }
  ];

  const [budget, setBudget] = useState([0, 10000]);
  const [minPayout, setMinPayout] = useState([0, 200]);
  const [rewardRate, setRewardRate] = useState([0, 50]);
  const [maxPayout, setMaxPayout] = useState([0, 1000]);

  const toggleItem = (list: any, setList: any, item: any) => {
    setList((prev: any) => prev.includes(item) ? prev.filter((i: any) => i !== item) : [...prev, item]);
  };

  const apply = () => {
    onApply({ visibility, contentType, genres, categories, platforms, budget, minPayout, rewardRate, maxPayout });
    onOpenChange(false);
  };

  const clear = () => {
    setVisibility("Both");
    setContentType("Both");
    setGenres([]);
    setCategories([]);
    setPlatforms([]);
    setBudget([0, 10000]);
    setMinPayout([0, 200]);
    setRewardRate([0, 50]);
    setMaxPayout([0, 1000]);
  };

  return (
    <Dialog  open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" p-8 w-full! max-w-[1000px]! h-[80vh]! overflow-y-auto">
        <DialogHeader className="text-center!">
          <DialogTitle className="text-2xl font-semibold">Filter Campaigns</DialogTitle>
          <DialogDescription className="text-gray-500 text-sm">
            Refine your search with advanced filters
          </DialogDescription>
        </DialogHeader>
        
        {/* TOP SELECTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Visibility */}
          <div>
            <label className="text-sm font-medium">Visibility</label>
            <select value={visibility} onChange={e => setVisibility(e.target.value)} className="mt-2 w-full h-12 border rounded-xl px-3">
              <option>Both</option>
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>

          {/* Content Type */}
          <div>
            <label className="text-sm font-medium">Content Type</label>
            <select value={contentType} onChange={e => setContentType(e.target.value)} className="mt-2 w-full h-12 border rounded-xl px-3">
              <option>UGC</option>
              <option>Clipping</option>              
            </select>
          </div>
        </div>

        {/* MUSIC GENRE */}
        <div className="mt-5">
          <p className="font-medium mb-3">Music Genre</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {musicGenres.map(g => (
              <button
                key={g}
                onClick={() => toggleItem(genres, setGenres, g)}
                // @ts-ignore
                className={`border rounded-xl py-2 ${genres?.includes(g) ? "bg-black text-white" : "bg-white"}`}
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
            {categoryList.map(cat => (
              <button
                key={cat}
                onClick={() => toggleItem(categories, setCategories, cat)}
                // @ts-ignore
                className={`border rounded-xl py-2 ${categories?.includes(cat) ? "bg-black text-white" : "bg-white"}`}
              >{cat}</button>
            ))}
          </div>
        </div>

        {/* PLATFORM */}
        <div className="mt-5">
          <p className="font-medium mb-3">Platform</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {platformList.map(p => (
              <div key={p.name} className="flex items-center gap-3 border rounded-xl p-4">
                {/* @ts-ignore */}
                <Checkbox checked={platforms?.includes(p?.name)} onCheckedChange={() => toggleItem(platforms, setPlatforms, p.name)} />
                <img src={p.icon} className="w-8 h-8" />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SLIDERS */}
        <p className="font-medium mt-5">Budget</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          <div>
            <p className="pb-3">Campaign Budget: ${budget[0]} - ${budget[1]}</p>
            <Slider value={budget} min={0} max={10000} step={100} onValueChange={setBudget} />
          </div>
          <div>
            <p className="pb-3">Minimum Payout: ${minPayout[0]} - ${minPayout[1]}</p>
            <Slider value={minPayout} min={0} max={200} onValueChange={setMinPayout} />
          </div>
          <div>
            <p className="pb-3">Reward Rate / 1000 views: ${rewardRate[0]} - ${rewardRate[1]}</p>
            <Slider value={rewardRate} min={0} max={50} onValueChange={setRewardRate} />
          </div>
          <div>
            <p className="pb-3">Maximum Payout: ${maxPayout[0]} - ${maxPayout[1]}</p>
            <Slider value={maxPayout} min={0} max={1000} onValueChange={setMaxPayout} />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between mt-10">
          <Button variant="outline" className="h-12 w-40 rounded-full" onClick={clear}>Clear filters</Button>
          <Button className="bg-orange-500 h-12 w-40 rounded-full text-white" onClick={apply}>Search result</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}