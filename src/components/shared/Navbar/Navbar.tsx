"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Menu, X, Bell, Wallet, Contact, LogOut, CircleUser, User, Heart, MessageCircle, UserPlus, Settings, } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { imageUrl } from "@/constants";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Container from "../Container";
import { Button } from "@/components/ui/button";
import { deleteCookie } from "cookies-next";
import { revalidate } from "@/helpers/revalidateHelper";
import { toast } from "sonner";
import NotificationBar from "../Notifications/NotificationBar";
import { myFetch } from "@/utils/myFetch";
import { Badge } from "@/components/ui/badge";
import useSocket from "@/hooks/useSocket";


// Mock notification data generator
const generateNotification = (id: any) => {
  const types = [
    { icon: Heart, text: 'liked your post', color: 'bg-red-100' },
    { icon: MessageCircle, text: 'commented on your post', color: 'bg-blue-100' },
    { icon: UserPlus, text: 'started following you', color: 'bg-green-100' },
    { icon: User, text: 'tagged you in a post', color: 'bg-purple-100' }
  ];
  const type = types[Math.floor(Math.random() * types.length)];
  const names = ['Sarah Johnson', 'Mike Chen', 'Emily Davis', 'Alex Rodriguez', 'Jessica Brown'];

  return {
    id,
    user: names[Math.floor(Math.random() * names.length)],
    avatar: `https://i.pravatar.cc/150?img=${id % 70}`,
    type: type.text,
    icon: type.icon,
    iconColor: type.color,
    time: id < 5 ? `${Math.floor(Math.random() * 60)}m` : id < 15 ? `${Math.floor(Math.random() * 24)}h` : `${Math.floor(Math.random() * 30)}d`,
    read: id > 3 && Math.random() > 0.5
  };
};




const Navbar = ({ profile }: { profile: any }) => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isBarOpen, setIsBarOpen] = useState(false);



  const pathname = usePathname();
  const darkBgRoutes = ["creator", "promotor", "success", "notifications"];
  const hasDarkBackground = darkBgRoutes.includes(pathname.split("/")[1]);

  useEffect(() => {
    // Set role in localStorage if it doesn't exist
    if (profile?.role && typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('role');
      if (!storedRole) {
        localStorage.setItem('role', profile.role);
      }
    }
  }, [profile]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const links = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about-us" },
    { name: "Contact us", href: "/contact" },
    // { name: "My Hub", href: "/creator" },
  ];

  const isActive = (href: string) => pathname === href;
  if (!mounted) return null;



  return (
    <div>
      <nav
        className={`fixed w-full z-50 px-2 py-2 md:py-6 md:px-8 lg:px-12 transition-all duration-300
        ${scrolled && !openMenu
            ? "backdrop-blur-xl bg-[#15141A]/70 shadow-lg"
            : hasDarkBackground || openMenu
              ? "bg-black"
              : "md:transparent"
          }`}
      >
        <Container>
          <div className="flex items-center justify-between relative">
            <Link href="/">
              <div className="relative h-12 w-12">
                <Image src="/logo.png" alt="logo" height={50} width={50} />
              </div>
            </Link>

            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-1/2 items-center gap-2 glassBg rounded-full px-8 py-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 py-2 transition-colors
                    ${isActive(link.href)
                      ? "text-orange-500 font-semibold"
                      : "text-white/80 hover:text-orange-500"
                    } whitespace-nowrap`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {profile ? (<ViewAsLogin profile={profile} isBarOpen={isBarOpen} setIsBarOpen={setIsBarOpen} />) :
                (<><Link href="/login"><Button className="bg-primary btn text-white rounded-full">Log In</Button></Link></>)}

              <button onClick={() => setOpenMenu(true)} className="md:hidden p-2 text-white"> <Menu className="w-6 h-6" /></button>
            </div>
          </div>



          {openMenu && (
            <div className="md:hidden absolute w-4/5 left-0 h-screen top-0 backdrop-blur-xl bg-black/50 shadow-lg border border-white/10 p-4">
              <div className="relative flex flex-col h-full">
                <div className="flex items-center gap-2 border-b border-gray-700 pb-2">
                  <Link href="/">
                    <Image src="/logo.png" alt="logo" width={35} height={35} />
                  </Link>
                  <h1 className="text-xl font-semibold text-white">Whop</h1>
                </div>

                <X
                  onClick={() => setOpenMenu(false)}
                  className="w-6 h-6 text-white absolute right-0"
                />

                <div className="flex flex-col gap-2 mt-6">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpenMenu(false)}
                      className={`px-4 py-3 rounded-lg ${isActive(link.href) ? "bg-orange-500 text-white" : "text-white/80 hover:bg-white/5"}`}>
                      {link.name}
                    </Link>
                  ))}
                </div>

                <Link href="/signup">
                  <button className="mt-auto bg-linear-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          )}
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;

const ViewAsLogin = ({ profile, isBarOpen, setIsBarOpen }: any) => {
  // -- Notification State ------------
  const [view, setView] = useState('bar');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [unReadNotificationCount, setUnReadNotificationCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const socket = useSocket();

  // ✅ FIX 2: Proper socket listener with cleanup
  useEffect(() => {
    if (!profile?._id || !socket) return;

    const eventName = `notification::${profile?._id}`;

    const handleNewMessage = async () => {
      getNotificationData()
    }
    socket.on(eventName, handleNewMessage);
    return () => {
      socket.off(eventName, handleNewMessage);
    }
  }, [profile?._id, socket])

  const handleLogout = () => {
    Cookies.remove("accessToken");

    deleteCookie("user");
    revalidate("user-profile");
    router.push("/");
    toast.success("Logged out successfully");
    if (typeof window !== 'undefined') {
      localStorage.removeItem("role");
    }
  };

  const getNotificationData = async (pageNum: number = 1) => {
    try {
      setLoading(true);
      const response = await myFetch(`/notifications?page=${pageNum}`, {
        cache: "no-cache"
      });

      if ((response as any)?.success) {
        const { result, unreadCount } = response?.data;
        if (pageNum === 1) {
          setUnReadNotificationCount(unreadCount);
        }
        setNotifications(prev => pageNum === 1 ? result : [...prev, ...result]);

        setTotalPages(Number(response?.meta?.totalPage));
        setHasMore(pageNum < Number(response?.meta?.totalPage));
      }
    } catch (error) {
      console.log("notification error", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    getNotificationData(nextPage);
  };

  const markAllAsRead = async () => {
    try {
      await myFetch("/notifications", { method: "PATCH" });
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
      setUnReadNotificationCount(0);
    } catch (error) {
      console.log("Mark all as read error", error);
    }
  };

  useEffect(() => {
    getNotificationData(1);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <Wallet strokeWidth={1} size={30} color="#ededed" />
      <div className="relative">
        <Bell
          onClick={() => setIsBarOpen(true)}
          strokeWidth={1}
          size={30}
          color="white"
          className="cursor-pointer"
        />
        {unReadNotificationCount > 0 && (
          <Badge className="bg-red-600 absolute -top-2 -right-1 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
            {unReadNotificationCount}
          </Badge>
        )}
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          {profile?.image ? (
            <Avatar className="rounded-lg cursor-pointer">
              <div className="border-slate-300/50 rounded-full">
                <AvatarImage
                  src={
                    profile?.image
                      ? `${imageUrl}${profile?.image}`
                      : "/placeholder.png"
                  }
                  alt={profile?.name}
                  className="w-12 h-12 object-fill rounded-full"
                />
              </div>
            </Avatar>
          ) : (
            <CircleUser strokeWidth={1.25} size={30} color="#DBDBDB" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <Link href={profile?.role === "CREATOR" ? "/creator" : "/promotor"}>
            <DropdownMenuItem className="cursor-pointer">
              Profile
              <DropdownMenuShortcut>
                <Contact />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onSelect={handleLogout}>
            Logout
            <DropdownMenuShortcut>
              <LogOut />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <NotificationBar
        isOpen={isBarOpen}
        onClose={() => setIsBarOpen(false)}
        notifications={notifications}
        onLoadMore={loadMore}
        hasMore={hasMore}
        loading={loading}
        onMarkAllRead={markAllAsRead}
      />
    </div>
  );
};

