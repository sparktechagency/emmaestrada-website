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


// Mock notification data generator
const generateNotification = (id:any) => {
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
  const [mounted, setMounted] = useState(false); // ✅ ADD
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // -- NOtification State ------------
  const [view, setView] = useState('bar');
  const [isBarOpen, setIsBarOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // -- NOtification State End ------------

  const pathname = usePathname();
  const darkBgRoutes = ["creator", "promotor", "success", "notifications"];
  
  const hasDarkBackground = darkBgRoutes.includes(pathname.split("/")[1]);


    const loadMore = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);

    setTimeout(() => {
      const newPage = page + 1;
      const newNotifications = Array.from(
        { length: 10 }, 
        (_, i) => generateNotification(page * 15 + i)
      );
      
      setNotifications((prev) => [...prev, ...newNotifications]);
      setPage(newPage);
      setLoading(false);
      
      if (newPage >= 5) setHasMore(false);
    }, 1000);
  };

    // Initialize notifications
    useEffect(() => {
      const initial = Array.from({ length: 15 }, (_, i) => generateNotification(i));
      setNotifications(initial);
    }, []);
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };


  // ✅ Mount guard
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Scroll logic AFTER mount
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

  // ⛔ CRITICAL: prevent SSR/CSR mismatch
  if (!mounted) return null;

  // console.log(profile);
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
            {/* Logo */}
            <Link href="/">
              <div className="relative h-12 w-12">
                <Image src="/logo.png" alt="logo" height={50} width={50} />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-1/2 items-center gap-2 glassBg rounded-full px-8 py-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 transition-colors
                    ${isActive(link.href)
                      ? "text-orange-500 font-semibold"
                      : "text-white/80 hover:text-orange-500"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* 🔧 Loading/Error moved INSIDE navbar */}
              {/* {loading && (
                <span className="text-xs text-white/70">Loading...</span>
              )}
              {error && <span className="text-xs text-red-500">{error}</span>} */}

              {profile ? (
                <ViewAsLogin profile={profile} setIsBarOpen={setIsBarOpen} />
              ) : (
                <>
                  <Link href="/login">
                    <Button className="bg-primary btn text-white rounded-full">
                      Log In
                    </Button>
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setOpenMenu(true)}
                className="md:hidden p-2 text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          <NotificationBar
            isOpen={isBarOpen}
            onClose={() => setIsBarOpen(false)}
            notifications={notifications}
            onLoadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
            onMarkAllRead={markAllAsRead}
          />

          {/* Mobile Menu */}
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
                      className={`px-4 py-3 rounded-lg
                        ${isActive(link.href)
                          ? "bg-orange-500 text-white"
                          : "text-white/80 hover:bg-white/5"
                        }`}
                    >
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

/* ✅ KEPT your component, just improved usage */
const ViewAsLogin = ({ profile, setIsBarOpen }: any) => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    deleteCookie("user");
    revalidate("user-profile");
    router.push("/");
    toast.success("Logged out successfully");
  };
  return (
    <div className="flex items-center gap-3">
      <Wallet strokeWidth={1} size={30} color="#ededed" />
      <Bell onClick={()=>setIsBarOpen(true)} strokeWidth={1} size={30} color="white" />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          {profile?.image ?
            <Avatar className="rounded-lg cursor-pointer">
              <div className=" border-slate-300/50 rounded-full">

                <AvatarImage
                  src={
                    profile?.image
                      ? `${imageUrl}${profile?.image}`
                      : "/placeholder.png"
                  }
                  alt={profile?.name}
                  className="w-12 h-12 object-fill rounded-full "
                />
              </div>
            </Avatar>
            : <CircleUser strokeWidth={1.25} size={30} color="#ededed" />}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <Link href={profile?.role == "CREATOR" ? "/creator" : "/promotor"}>
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
    </div>
  );
};
