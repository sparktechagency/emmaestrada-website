"use client";

import React, { useEffect, useState } from "react";
import Container from "./Container";
import Link from "next/link";
import { Search, Menu } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 px-4 py-6 md:px-8 lg:px-12 transition-all duration-300
      ${scrolled ? "backdrop-blur-xl bg-[#15141A]/70 shadow-lg" : "bg-transparent"}`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10  rounded-lg flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-8 py-3">
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
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block p-2 text-white hover:text-orange-500 transition-colors">
              <Search className="w-6 h-6" />
            </button>

            <Link href="/login"><button className="bg-primary btn text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all">
              Sign up / Sign in
            </button></Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="hidden md:hidden mt-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
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
              className="px-4 py-3 text-white/80 hover:bg-white/5 rounded-lg transition-colors"
            >
              Contact us
            </Link>

            <div className="flex items-center gap-2 mt-2">
              <button className="flex-1 bg-white/5 text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
                <Search className="w-5 h-5 mx-auto" />
              </button>

              <button className="flex-1 bg-linear-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all">
                Sign up / Sign in
              </button>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
