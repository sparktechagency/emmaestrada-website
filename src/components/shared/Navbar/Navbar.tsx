"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Menu, X, Bell, Wallet, Contact, LogOut } from "lucide-react";
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

const Navbar = ({ profile }: { profile: any }) => {
  const [mounted, setMounted] = useState(false); // ✅ ADD
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const pathname = usePathname();
  const darkBgRoutes = ["creator", "promotor"];
  const hasDarkBackground = darkBgRoutes.includes(pathname.split("/")[1]);

  // const { profile, loading, error } = useProfile();

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
    { name: "My Hub", href: "/creator" },
  ];

  const isActive = (href: string) => pathname === href;

  // ⛔ CRITICAL: prevent SSR/CSR mismatch
  if (!mounted) return null;

  // console.log(profile);
  return (
    <div>
      <nav
        className={`fixed w-full z-50 px-2 py-2 md:py-6 md:px-8 lg:px-12 transition-all duration-300
        ${
          scrolled && !openMenu
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
                    ${
                      isActive(link.href)
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
                <ViewAsLogin profile={profile} />
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
                        ${
                          isActive(link.href)
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
const ViewAsLogin = ({ profile }: any) => {
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
      <Bell strokeWidth={1} size={30} color="white" />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar className="rounded-lg cursor-pointer">
            <div className="border-2 border-slate-300/50 rounded-full p-1">
              <AvatarImage
                src={
                  profile?.image
                    ? `${imageUrl}${profile?.image}`
                    : "https://www.svgrepo.com/show/452030/avatar-default.svg"
                }
                alt={profile?.name}
                className="w-8 h-8 object-fill rounded-full "
              />
            </div>
            <AvatarFallback>{profile?.name?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <Link href={profile?.role == "CREATOR" ? "/creator" : "promotor"}>
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
