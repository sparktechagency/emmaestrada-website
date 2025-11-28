"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Image, MapPin, AtSign } from "lucide-react";

export default function ProfileInfo() {
  return (
    <div className=" space-y-10">
      {/* PERSONAL INFORMATION CARD */}
      <Card className="p-6 md:p-10 rounded-3xl shadow-sm">

        {/* Top User Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

          <div className="flex items-center gap-5">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-orange-500 text-white text-2xl">
                LR
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-semibold">Luna Rivers</h2>
              <p className="text-gray-500 text-sm">Pop Artist</p>

              <Badge className="bg-green-100 text-green-700 mt-2 rounded-full">
                Verified Account
              </Badge>
            </div>
          </div>

          <Button variant="outline" className="rounded-full flex gap-2">
            <Image size={18} /> Change Photo
          </Button>
        </div>

        <Separator className="my-8" />

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Full Name</label>
            <Input defaultValue="Luna Rivers" className="h-12 rounded-xl" />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Email Address</label>
            <Input
              defaultValue="user@musicflow.com"
              className="h-12 rounded-xl"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Phone Number</label>
            <Input
              defaultValue="+1 (555) 123-4567"
              className="h-12 rounded-xl"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <Input
                defaultValue="Los Angeles, CA"
                className="h-12 pl-10 rounded-xl"
              />
            </div>
          </div>

          {/* Primary Genre */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-medium">Primary Genre</label>
            <Input defaultValue="Pop" className="h-12 rounded-xl" />
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Instagram */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Instagram</label>
            <div className="relative">
              <AtSign className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <Input defaultValue="@musicflow" className="h-12 pl-10 rounded-xl" />
            </div>
          </div>

          {/* Tiktok */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Tiktok</label>
            <div className="relative">
              <AtSign className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <Input defaultValue="@jadakpop" className="h-12 pl-10 rounded-xl" />
            </div>
          </div>

          {/* YouTube */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">YouTube</label>
            <Input defaultValue="Luna Rivers" className="h-12 rounded-xl" />
          </div>
        </div>

        {/* Artist Bio */}
        <div className="mt-10 flex flex-col gap-3">
          <label className="font-medium">Artist Bio</label>
          <Textarea
            defaultValue="Pop artist with a passion for creating catchy melodies and meaningful lyrics. Known for chart-topping hits and energetic live performances."
            className="rounded-2xl min-h-[120px] bg-orange-50 border-0"
          />
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col md:flex-row justify-end gap-4">
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 border-gray-300"
          >
            Cancel
          </Button>
          <Button
            className="rounded-full px-10 py-6 bg-orange-500 hover:bg-orange-600"
          >
            Next Step
          </Button>
        </div>
      </Card>

      {/* ACCOUNT SETTINGS */}
      <Card className="p-6 md:p-10 rounded-3xl shadow-sm">

        <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

        <div className="space-y-6">

          <SettingsRow
            title="Email Notifications"
            desc="Receive updates about campaigns and requests"
            action="Configure"
          />

          <Separator />

          <SettingsRow
            title="Privacy Settings"
            desc="Manage your profile visibility"
            action="Manage"
          />

          <Separator />

          <SettingsRow
            title="Payment Methods"
            desc="Update your payment information"
            action="Edit"
          />

          <Separator />

          <SettingsRow
            title="Account Security"
            desc="Change password and enable 2FA"
            action="Update"
          />

        </div>
      </Card>
    </div>
  );
}

/* Reusable Settings Row Component */
function SettingsRow({ title, desc, action }: any) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>

      <Button variant="ghost" className="text-orange-500 font-medium">
        {action}
      </Button>
    </div>
  );
}
