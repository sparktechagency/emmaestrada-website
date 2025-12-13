"use client";

import React, { useEffect, useState } from "react";
import Container from "./Container";
import Link from "next/link";
import { Search, Menu, X, Bell, Wallet } from "lucide-react";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { IoNotifications } from "react-icons/io5";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [loginView, setLoginView] = useState(true)

  const pathname = usePathname();
  const darkBgRoutes = ['influencer', 'promotor'];
  const hasDarkBackground = darkBgRoutes.includes(pathname.split('/')[1]);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window?.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about-us" },
    { name: "Contact us", href: "/contact" },
    { name: "My Hub", href: "/influencer" },
  ];

  const isActive = (href: string) => pathname === href;

  
  return (
    <div>
      <nav
        className={`fixed w-full z-50 px-2 py-2 md:py-6 md:px-8 lg:px-12 transition-all duration-300
        ${scrolled && !openMenu ? "backdrop-blur-xl bg-[#15141A]/70 shadow-lg" : hasDarkBackground || openMenu ? "bg-black" : "md:transparent"}`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="relative h-12 w-12">
                <Image src="/logo.png" alt="logo" fill />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 glassBg rounded-full! px-8 py-3">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 transition-colors
                    ${isActive(link.href) ? "text-orange-500 font-semibold" : "text-white/80 hover:text-orange-500"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {loginView ? <ViewAsLogin /> : <>
                <Link href="/login">
                  <button className="bg-primary btn text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all">
                    Sign in
                  </button>
                </Link>

                <button onClick={() => setLoginView(true)} className="border-primary border btn bg-white text-primary rounded-full hover:from-orange-600 hover:to-orange-700 transition-all">
                  View as login
                </button>
              </>}

              {/* Mobile Menu Button */}
              <button onClick={() => setOpenMenu(true)} className="md:hidden p-2 text-white">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {openMenu && (
            <div className="md:hidden absolute w-4/5 left-0 h-screen top-0 backdrop-blur-xl bg-black/50 shadow-lg border border-white/10 p-4">
              <div className="relative flex flex-col h-full">
                <div className="flex items-center gap-2 border-b border-gray-700 pb-2">
                  <Link href="/"><div>
                    <Image src="/logo.png" alt="logo" width={35} height={35} />
                  </div></Link>
                  <h1 className="text-xl font-semibold text-white">Whop</h1>
                </div>

                <X onClick={() => setOpenMenu(false)} className="w-6 h-6 text-white absolute right-0" />

                <div className="flex flex-col gap-2 mt-6">
                  {links.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpenMenu(false)}
                      className={`px-4 py-3 rounded-lg transition-colors
                        ${isActive(link.href) ? "bg-orange-500 text-white" : "text-white/80 hover:bg-white/5"}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <button className="mt-auto! bg-linear-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all">
                  Sign in
                </button>
              </div>
            </div>
          )}
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;


const ViewAsLogin = () => {
  return (<div className="flex items-center gap-3">
    <Wallet  size={30}  color="#ededed"/>
    <Bell size={30}  color="white"/>
    <Link href="/influencer">
    <Avatar className="rounded-lg ">
      <AvatarImage
        src="/images/profile21.jpg"
        alt="@evilrabbit"
        className="w-12 rounded-full border-2!  border-slate-300!"
      />
      <AvatarFallback>ER</AvatarFallback>
    </Avatar>
    </Link>
  </div>)
}