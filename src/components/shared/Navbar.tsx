import React from "react";
import Container from "./Container";
import Link from "next/link";
import { Button } from "../ui/button";
import { CircleFadingArrowUpIcon, Menu } from "lucide-react";



const Navbar = () => {
  return (
    <div className=" fixed top-0 w-full h-20 bg-white backdrop-blur-lg shadow-sm z-50">
      <Container>
        <div className="flex items-center justify-between">
          <ul className=" items-center gap-3 hidden md:flex">
            <Link href="/" className="hover:text-primary cursor-pointer">
              Home
            </Link>
            <Link href="/" className="hover:text-primary cursor-pointer">
              About Us
            </Link>
            <Link href="/" className="hover:text-primary cursor-pointer">
              Support
            </Link>
          </ul>

          {/* ------------ Logo ----------- */}
          <div className="w-24 h-18 overflow-hidden">
            <img
              src="https://img.freepik.com/premium-vector/bat-logo-vector-20_666870-10151.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Logo"
              className="h-full w-full object-cover overflow-hidden"
            />
          </div>

          <div className="hidden md:flex items-center gap-5">
            <Button variant="outline" className="transition">
              Login
            </Button>
            <Button className="px-4 py-2 bg-blue-500  text-white rounded-md hover:bg-primary/80 transition">
              Sign Up
            </Button>
          </div>
          <Button className="md:hidden" variant="outline" size="icon-lg">
            <Menu />
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
