"use client";

import React, { useEffect, useState } from "react";
import Container from "./Container";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const darkBgRoutes = ['influencer', 'promotor']

  const pathname = usePathname()
  const hasDarkBackground = darkBgRoutes.includes(pathname.split('/')[1])
  // ${scrolled ? "backdrop-blur-xl bg-[#15141A]/70 shadow-lg" : hasDarkBackground ? "bg-black" : "transparent"}`}
  return (
    <div className="">
      <nav
        className={`fixed w-full z-50  px-2 py-2 md:py-6 md:px-8 lg:px-12 transition-all duration-300 
      
      ${scrolled && !openMenu ? "backdrop-blur-xl bg-[#15141A]/70 shadow-lg" : hasDarkBackground ||  openMenu ? "bg-black" : "md:transparent"}`}
      >
        <Container>
          <div className="flex items-center justify-between ">
            {/* Logo */}
            <Link href="#"><div className="relative h-12 w-12">
              <Image src="/logo.png" alt="logo" fill />
            </div></Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 glassBg rounded-full! px-8 py-3">
              <Link
                href="/"
                className="px-4 py-2 text-white hover:text-orange-500 transition-colors"
              >
                Home
              </Link>

              <Link
                href="/about-us"
                className="px-4 py-2 text-white/80 hover:text-orange-500 transition-colors"
              >
                About us
              </Link>

              <Link
                href="/contact"
                className="px-4 py-2 text-white/80 hover:text-orange-500 transition-colors"
              >
                Contact us
              </Link>
              <Link
                href="/influencer"
                className="px-4 py-2 text-white/80 hover:text-orange-500 transition-colors"
              >
                My Hub
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <button className="hidden sm:block p-2 text-white hover:text-orange-500 transition-colors">
                <Search className="w-6 h-6" />
              </button>

              <Link href="/login"><button className="bg-primary btn text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all">
                Sign in
              </button></Link>

              {/* Mobile Menu Button */}
              <button onClick={() => setOpenMenu(true)} className="md:hidden p-2 text-white">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {openMenu && <div className=" md:hidden absolute w-4/5 left-0 h-screen top-0 backdrop-blur-xl bg-black/50 shadow-lg border border-white/10 p-4">
            <div className="relative flex flex-col h-full">
              <div className="flex items-center gap-2 border-b border-gray-700 pb-2">
                <div className="">
                  <Image src="/logo.png" alt="logo" width={35} height={35} />
                </div>
                <h1 className="text-xl font-semibold text-white">Whop</h1>
              </div>

              <X onClick={() => setOpenMenu(false)} className="w-6 h-6 text-white absolute right-0" />
              <div className="flex flex-col gap-2">
                <Link
                  href="#home"
                  className="px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Home
                </Link>

                <Link
                  href="#about"
                  className="px-4 py-3 text-white/80 hover:bg-white/5 rounded-lg transition-colors"
                >
                  About us
                </Link>

                <Link
                  href="#contact"
                  className="px-4 py-3 text-white/80 hover:bg-white/5 rounded-lg transition-colors "
                >
                  Contact us
                </Link>
              </div>
              <button className=" mt-auto! bg-linear-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all">
                Sign in
              </button>
            </div>
          </div>}
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;
