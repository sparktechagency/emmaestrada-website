"use client";

import React from "react";
import { Button } from "../../button";
import {
  Music,
  User,
  BarChart3,
  MessageSquare,
  Shield,
  UserCircle,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Repeat,
  Users,
  Send,
  Handshake,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import HeaderSearch from "./HeaderSearch";
import { usePathname } from "next/navigation";

const PromotorHeader = () => {
  const pathname = usePathname();

  // ACTIVE LINK FIX
  const isActive = (path: string) => {
    if (path === "/promotor") {
      return pathname === "/promotor"; // exact match only
    }

    if (path === "#") return false; // avoid active for placeholder link

    return pathname.startsWith(path);
  };

  const displayLinks = [
    { link: "/promotor", label: "Campaigns", icon: Music },
    { link: "/promotor/influencer", label: "Influencer", icon: UsersRound },
    { link: "/promotor/promotor-list", label: "Promotor", icon: UsersRound },
    { link: "/promotor/analytics", label: "Analytics", icon: BarChart3 },
    { link: "/promotor/messages", label: "Messages", icon: MessageSquare },
    { link: "/promotor/trusted-creators", label: "Trusted Creator", icon: Handshake },    
    { link: "/promotor/profile", label: "Profile", icon: UserCircle },
  ];

  return (
    <div>
      <Container>
        <div className="mt-40 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button className="btn flex items-center gap-2 bg-white font-semibold text-black text-lg rounded-full shadow">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Currently viewing as: Music promoter</span>
            </button>

            <Link href="/influencer">
              <button className="btn bg-primary text-white flex items-center w-full sm:w-auto text-lg rounded-full shadow whitespace-nowrap">
                <Repeat className="w-4 h-4 mr-2" />
                Switch into music creator
              </button>
            </Link>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar p-4 glassBg rounded-md shadow">
          {displayLinks?.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.link);

            return (
              <Link
                key={item.link}
                href={item.link}
                className={`flex items-center justify-center gap-2 w-full px-5 py-2 rounded-lg whitespace-nowrap transition-colors border 
                  ${active
                    ? "bg-primary text-white border-primary shadow"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }
                `}
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

export default PromotorHeader;
