"use client";

import React from "react";
import { Button } from "../../button";
import {
  Music,
  User,
  BarChart3,
  MessageSquare,
  UserCircle,
  Repeat,
  UsersRound,
  Handshake,
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import { usePathname } from "next/navigation";

const InfluencerHeader = () => {
  const pathname = usePathname();

  

  const displayLinks = [
    { link: "/creator", label: "Campaigns", icon: Music },
    { link: "/creator/creators", label: "Creator", icon: UsersRound },
    { link: "/creator/promotor", label: "Promotor", icon: UsersRound },
    { link: "/creator/analytics", label: "Analytics", icon: BarChart3 },
    { link: "/creator/messages", label: "Messages", icon: MessageSquare },
    { link: "/creator/trusted-promotors", label: "Trusted Promotor", icon: Handshake },
    { link: "/creator/profile", label: "Profile", icon: UserCircle },
  ];

  const isActive = (path: string) => {
  if (path === "/creator") {
    // active only on "/creator" root
    return pathname === "/creator";
  }
  return pathname.startsWith(path);
};
  return (
    <div>
      <Container>
        <div className="mt-40 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ">
            <button className="btn flex items-center gap-2 bg-white font-semibold text-black text-lg rounded-full shadow-md">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Currently viewing as: Creator</span>
            </button>

            <Link href="/promotor">
              <button className="btn bg-primary text-white flex items-center w-full sm:w-auto text-lg rounded-full shadow-md">
                <Repeat className="w-4 h-4 mr-2" />
                Switch into music promoter
              </button>
            </Link>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar p-4 glassBg rounded-md shadow-md">
          {displayLinks.map((item) => {
            const Icon = item.icon;
            // const isActive = pathname.startsWith(item.link); // detect active

            return (
              <Link
                href={item.link}
                key={item.link}
                className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg whitespace-nowrap transition-all border 
                  ${
                    isActive(item.link)
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default InfluencerHeader;
