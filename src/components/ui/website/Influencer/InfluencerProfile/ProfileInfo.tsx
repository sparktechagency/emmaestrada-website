'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AtSign, Camera, LucideUserPlus, MapPin, X, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";

import DatePicker from "@/components/shared/DatePicker";
import Loader from "@/components/shared/Loader";
import { imageUrl } from "@/constants";
import { useProfile } from "@/hooks/context/ProfileContext";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const isoToDate = (date: any) => {
  const yyyyMmDd = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
  return yyyyMmDd;
}

export default function ProfileInfo() {
  const { profile, refetchProfile, loading: profileLoading } = useProfile();

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [hasImageChanged, setHasImageChanged] = useState(false);
  const [contentTypes, setContentTypes] = useState<string[]>([]);  
  
  const [formData, setFormData] = useState<any>({});
  const router = useRouter()


  const fetchingContentTypes = async () => {
    try {
      const contentTypes = await myFetch('/categories?type=USER');
      const uContent = contentTypes?.data?.map((cat: any) => cat?.name)
      setContentTypes(uContent)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchingContentTypes();
  }, [])


  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        role: profile.role || "",
        gender: profile.gender || "",
        birthday: profile.birthday || "",
        location: profile.location || "",
        country: profile.country || "",
        bio: profile.bio || "",
        instagramUserName: profile.instagramUserName || "",
        instagramFollowers: profile.instagramFollowers || 0,
        tiktokUserName: profile.tiktokUserName || "",
        tiktokFollowers: profile.tiktokFollowers || 0,
        youtubeUserName: profile.youtubeUserName || "",
        youtubeFollowers: profile.youtubeFollowers || 0,
      });
      setSelected(profile.contentTypes || []);
      setPreviewUrl(profile.image ? `${imageUrl}${profile.image}` : null);
      setImageFile(null);
      setHasImageChanged(false);
    }
  }, [profile]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setHasImageChanged(true);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    try {
      setImageLoading(true);
      const body = new FormData();
      body.append("image", imageFile);

      const res = await myFetch("/users/profile", {
        method: "PATCH",
        body,
      });


      if (res?.success) {
        refetchProfile();
        toast.success("Profile picture updated successfully!");
      } else {
        console.log("res", res);
        toast.error(res?.message);
        router.refresh();
      }
    } catch (err: any) {
      alert(err?.message || "Something went wrong");
    } finally {
      setImageLoading(false);
    }
  };

  const cancelImageChange = () => {
    setImageFile(null);
    setPreviewUrl(profile?.image ? `${imageUrl}${profile.image}` : null);
    setHasImageChanged(false);
  };

  const addItem = (value: string) => {
    if (!selected.includes(value)) setSelected((prev) => [...prev, value]);
  };

  const removeItem = (value: string) => {
    setSelected((prev) => prev.filter((item) => item !== value));
  };

  const saveProfile = async () => {
    const payload = new FormData();
    try {
      setLoading(true);
      const dataToUpdate = { ...formData, contentTypes: selected };

      payload.append("data", JSON.stringify(dataToUpdate));
      const res = await myFetch("/users/profile", {
        method: "PATCH",
        body: payload,
      });


      if (res?.success) {
        refetchProfile();
        setEditMode(false);
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      alert(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) return <Loader />;

  return (
    <div className="space-y-10">
      <Card className="p-6 md:p-10 rounded-3xl shadow-sm">
        {/* Top User Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar className="w-20 h-20 border-2">
                <AvatarImage
                  src={previewUrl || "/placeholder.png"}
                  alt={profile?.userName}
                  className="w-full h-full object-cover rounded-full border-2 border-slate-300"
                />
                <AvatarFallback className="bg-orange-500 text-white text-2xl">
                  {profile?.userName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Image Upload Button */}
              <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-orange-500 hover:bg-orange-600 cursor-pointer border-2 border-white shadow-md transition-colors">
                <Camera size={16} className="text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              {/* Image Action Buttons */}
              {hasImageChanged && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/4 translate-y-full flex gap-2 mt-2">
                  <Button
                    size="sm"
                    className="h-8 px-3 rounded-full bg-green-500 hover:bg-green-600"
                    onClick={handleImageUpload}
                    disabled={imageLoading}
                  >
                    {imageLoading ? (
                      <span className="flex items-center gap-1">
                        <span className="animate-spin">⏳</span>
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Check size={14} />
                        Save
                      </span>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 rounded-full"
                    onClick={cancelImageChange}
                    disabled={imageLoading}
                  >
                    <X size={14} />
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold">{profile?.name ?? profile?.userName}</h2>
              <p className="text-gray-500 text-sm mb-1.5">{profile?.email}</p>
              <button disabled
                className="group flex items-center overflow-hidden rounded-sm border border-gray-200 bg-white transition-all"
              >
                <span className="flex items-center gap-2 px-5 py-1 text-xs font-semibold text-gray-700 transition-colors ">
                  <LucideUserPlus size={12} />
                  Followers
                </span>
                <span className="bg-gray-100 px-4 py-1 text-xs font-bold text-gray-900 transition-colors group-hover:bg-blue-50  border-l border-gray-200">
                  {profile?.totalFollowers}
                </span>
              </button>
            </div>
          </div>

          <Button
            variant="outline"
            className={`rounded-full flex gap-2 ${hasImageChanged ? "mt-7" : "mt-0"} md:mt-0`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel Edit" : "Edit Profile"}
          </Button>
        </div>

        <Separator className="my-8" />

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="h-12 rounded-xl "
              disabled={!editMode}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Email Address</label>
            <Input
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="h-12 rounded-xl bg-slate-100"
              disabled
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <Input
                value={formData.location}
                placeholder="Location"
                onChange={(e) => handleChange("location", e.target.value)}
                className="pl-10 h-12 rounded-xl"
                disabled={!editMode}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Country</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <Input
                value={formData.country}
                placeholder="Country"
                onChange={(e) => handleChange("country", e.target.value)}
                className="h-12 pl-10 rounded-xl bg-slate-100"
                disabled={!editMode}
              />
            </div>
          </div>

          <div className="col-span-1">
            <label className="font-medium ">Gender</label>
            <Select disabled={!editMode} value={formData?.gender} onValueChange={(value) => handleChange("gender", value)}>
              <SelectTrigger className="h-12! py-2! w-full  rounded-xl mt-2">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                {
                  [
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]?.map((item, index) => <SelectItem key={index} value={item?.value}>{item?.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div aria-disabled={!editMode} className="col-span-1 space-y-2">
            <p className="font-medium mb-2">Date of Birth</p>
            <DatePicker
              disabledDays={!editMode}
              value={formData.birthday}
              onChange={(date: any) =>
                setFormData((prev: any) => ({
                  ...prev,
                  birthday: isoToDate(date) || "",
                }))
              }
            />
          </div>

          {/* Social Media Section */}
          <div className="mt-3 md:mt-10 grid grid-cols-1 md:grid-cols-3  md:col-span-2 gap-6">

            <div className="flex flex-col gap-2 md:col-span-3">
              <label className="font-medium">Content Type</label>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex w-full md:w-3/5 h-12 overflow-y-auto flex-wrap items-center gap-2 rounded-xl border px-3 py-2">
                  {selected.length === 0 && <span className="text-sm text-muted-foreground">Select content types</span>}
                  {selected.map((item) => (
                    <span key={item} className="border-primary/80 border text-xs flex items-center gap-1 text-primary rounded-full px-2 uppercase">
                      {item}
                      {editMode && <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem(item)} />}
                    </span>
                  ))}
                </div>
                <Select disabled={!editMode} onValueChange={addItem}>
                  <SelectTrigger className="h-12! py-2! w-full md:w-2/5 rounded-xl">
                    <SelectValue placeholder="Add type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes?.map((item) => (
                      <SelectItem key={item} value={item} disabled={selected.includes(item)}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="">
              <div className="flex flex-col gap-2 mb-2">
                <label className="font-medium">Tiktok</label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <Input
                    placeholder="Tiktok username"
                    value={formData.tiktokUserName}
                    onChange={(e) => handleChange("tiktokUserName", e.target.value)}
                    className="h-12 pl-10 rounded-xl"
                    disabled={!editMode} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium">No. of Followers</label>
                <div className="relative">
                  <FcLikePlaceholder className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <Input
                    placeholder="Total Followers"
                    value={formData.tiktokFollowers}
                    onChange={(e) => handleChange("tiktokFollowers", e.target.value)}
                    className="h-12 pl-10 rounded-xl"
                    disabled={!editMode}
                  />
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex flex-col gap-2 mb-2">
                <label className="font-medium">Instagram</label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <Input
                    placeholder="Instagram username"
                    value={formData.instagramUserName}
                    onChange={(e) => handleChange("instagramUserName", e.target.value)}
                    className="h-12 pl-10 rounded-xl"
                    disabled={!editMode} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium">No. of Followers</label>
                <div className="relative">
                  <FcLikePlaceholder className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <Input
                    placeholder="Total Followers"
                    value={formData.instagramFollowers}
                    onChange={(e) => handleChange("instagramFollowers", e.target.value)}
                    disabled={!editMode}
                    className="h-12 pl-10 rounded-xl" />
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex flex-col gap-2 mb-2">
                <label className="font-medium">YouTube</label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <Input
                    placeholder="Youtube username"
                    value={formData.youtubeUserName}
                    onChange={(e) => handleChange("youtubeUserName", e.target.value)}
                    className="h-12 pl-10 rounded-xl"
                    disabled={!editMode} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">No. of Followers</label>
                <div className="relative">
                  <FcLikePlaceholder className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <Input
                    placeholder="Total Followers"
                    value={formData.youtubeFollowers}
                    onChange={(e) => handleChange("youtubeFollowers", e.target.value)}
                    className="h-12 pl-10 rounded-xl"
                    disabled={!editMode} />
                </div>
              </div>
            </div>
          </div>

          {/* Artist Bio */}
          <div className="mt-10 flex flex-col gap-3 md:col-span-2">
            <label className="font-medium">Artist Bio</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="rounded-2xl min-h-[120px] bg-orange-50 border-0"
              disabled={!editMode} />
          </div>
        </div>

        {/* Save Button */}
        {editMode && (
          <div className="mt-10 flex justify-end">
            <Button
              onClick={saveProfile}
              className="rounded-full px-10 py-6 bg-orange-500 hover:bg-orange-600"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}