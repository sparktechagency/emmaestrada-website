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
import { usePathname, useRouter } from "next/navigation";
import { useProfile } from "@/hooks/context/ProfileContext";
import Swal from "sweetalert2";
import { myFetch } from "@/utils/myFetch";
import Cookies from "js-cookie";

 const displayLinks = [
    { link: "/promotor", label: "Campaigns", icon: Music },
    { link: "/promotor/creator", label: "Creator", icon: UsersRound },
    { link: "/promotor/promotor-list", label: "Promotor", icon: UsersRound },
    { link: "/promotor/analytics", label: "Analytics", icon: BarChart3 },
    { link: "/creator/messages", label: "Messages", icon: MessageSquare },
    { link: "/promotor/trusted-creators", label: "Trusted Creator", icon: Handshake },    
    { link: "/promotor/profile", label: "Profile", icon: UserCircle },
  ];

  
const PromotorHeader = () => {
  const pathname = usePathname();
  const {profile} = useProfile();
  const route = useRouter()


  // ACTIVE LINK FIX
  const isActive = (path: string) => {
    if (path === "/promotor") {
      return pathname === "/promotor"; // exact match only
    }
    if (path === "#") return false; // avoid active for placeholder link
    return pathname.startsWith(path);
  };

  const handleSwitchRoleConfirm = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You you want to swich from Creator to Promotor",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Switch"
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {
          const res = await myFetch("/users/switched-role", { method: "POST" });
          console.log("role switch response", res);

          if (res?.success) {
            Swal.fire({
              title: "Role Updated!",
              text: "The role has been successfully switched to Promoter.",
              icon: "success",
            });

            Cookies.set("accessToken", res?.data?.data?.accessToken);
            route.push("/creator")
          } else {
            Swal.fire({
              title: "Failed!",
              text: res?.message || "Could not switch the user role.",
              icon: "error",
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while switching the user role.",
            icon: "error",
            theme: 'dark'
          });
        }
      }
    });
  };

 
  return (
    <div>
      <Container>
        <div className="mt-40 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button className="btn flex items-center gap-2 bg-white font-semibold text-black text-lg rounded-full shadow">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Currently viewing as: <span className="text-primary uppercase">{profile?.role}</span> </span>
            </button>
            
              <button onClick={()=>handleSwitchRoleConfirm()} className="btn bg-primary text-white flex items-center w-full sm:w-auto text-lg rounded-full shadow whitespace-nowrap">
                <Repeat className="w-4 h-4 mr-2" />
                Switch into music creator
              </button>            
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
