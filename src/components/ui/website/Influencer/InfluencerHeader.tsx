"use client";

import Container from "@/components/shared/Container";
import { myFetch } from "@/utils/myFetch";
import {
  BarChart3,
  Handshake,
  MessageSquare,
  Music,
  Repeat,
  UserCircle,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

import Cookies from "js-cookie";

import { revalidate } from "@/helpers/revalidateHelper";
import useSocket from "@/hooks/useSocket";
import { useEffect, useState } from "react";

const displayLinks = [
  { link: "/creator", label: "Campaigns", icon: Music },
  { link: "/creator/creators", label: "Creator", icon: UsersRound },
  { link: "/creator/promotor", label: "Promotor", icon: UsersRound },
  { link: "/creator/analytics", label: "Analytics", icon: BarChart3 },
  { link: "/creator/messages", label: "Messages", icon: MessageSquare },
  {
    link: "/creator/trusted-promotors",
    label: "Trusted Promotor",
    icon: Handshake,
  },
  { link: "/creator/profile", label: "Profile", icon: UserCircle },
];

const InfluencerHeader = ({ profile }: { profile: any }) => {
  const pathname = usePathname();
  const route = useRouter();
  const socket = useSocket();
  const [hasUnreadMesssage, setHasUnreadMessage] = useState(false)
  
    


  useEffect(() => {
    if (!profile?._id || !socket) return;

    const eventName = `newMessage::${profile?._id}`;
    const handleNewMessage = async () => {      
      setHasUnreadMessage(true)
    }
    socket.on(eventName, handleNewMessage);
    return () => {
      socket.off(eventName, handleNewMessage);
    }
  }, [profile?._id, socket])


  const isActive = (path: string) => {
    if (path === "/creator") {
      // active only on "/creator" root
      return pathname === "/creator";
    }
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
      confirmButtonText: "Yes, Switch",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await myFetch("/users/switched-role", { method: "POST" });
          if (res?.success) {
            Swal.fire({
              title: "Role Updated!",
              text: "The role has been successfully switched to Promoter.",
              icon: "success",
            });
            revalidate("profile");
            Cookies.set("accessToken", res?.data?.accessToken);            
             window.location.href = "/promotor"
            route.refresh();
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
            theme: "dark",
          });
        }
      }
    });
  };

  useEffect(() => {
    const isMessagesActive = displayLinks.some(
      (item) => item.label === "Messages" && isActive(item.link)
    );

    if (isMessagesActive) {
      setHasUnreadMessage(false);
    }
  }, [displayLinks, isActive]);

  return (
    <div>
      <Container>
        <div className="mt-40 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ">
            <button className="btn flex items-center gap-2 bg-white font-semibold text-black text-lg rounded-full shadow-md">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>
                Currently viewing as:{" "}
                <span className="text-primary uppercase">{profile?.role}</span>{" "}
              </span>
            </button>

            <button
              onClick={() => {
                handleSwitchRoleConfirm();
              }}
              className="btn bg-primary text-white flex items-center w-full sm:w-auto text-lg rounded-full shadow-md"
            >
              <Repeat className="w-4 h-4 mr-2" />
              Switch into music promoter
            </button>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar p-4 glassBg rounded-md shadow-md">
          {displayLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.link);
            return (
              <Link
                href={item.link}
                key={item.link}
                className={`relative flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg whitespace-nowrap transition-all border 
          ${active
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>

                {!active && hasUnreadMesssage && item.label === "Messages" && (
                  <span className="absolute -top-1 right-0 flex h-3 w-3">
                    {/* glow */}
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
                    {/* dot */}
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default InfluencerHeader;
