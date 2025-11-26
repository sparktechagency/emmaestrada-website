// components/Footer.tsx
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"
import Link from "next/link"
import Container from "./Container"
import { IoIosCall } from "react-icons/io"
import { MdEmail } from "react-icons/md";


export default function Footer() {
  return (
    <footer className="bg-[#FFA76A] border-t pt-32 pb-14 text-white ">
      <Container >
        <div className="grid grid-cols-1 pt-10 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold mb-3">Artify</h2>
            <p className="text-lg text-white">
              Authentic Job Bulletins for Influencer. Friendly for brands to create campaign.
            </p>
            <div className="flex gap-4 mt-4 sm:mt-5">
            <Link href="#" className="hover:text-primary flex items-center justify-center w-10 h-10 rounded-full bg-black"><Facebook size={18} /></Link>
            <Link href="#" className="hover:text-primary flex items-center justify-center w-10 h-10 rounded-full bg-black"><Twitter size={18} /></Link>
            <Link href="#" className="hover:text-primary flex items-center justify-center w-10 h-10 rounded-full bg-black"><Instagram size={18} /></Link>
            <Link href="mailto:info@artify.com" className="hover:text-primary flex items-center justify-center w-10 h-10 rounded-full bg-black"><Mail size={18} /></Link>
          </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-3 text-xl">Services</h3>
            <ul className="space-y-2 text-lg ">
              <li><Link href="/">About Us</Link></li>
              <li><Link href="/campaigns">Compaigns</Link></li>
              <li><Link href="/influencers">Influencers</Link></li>
              <li><Link href="/testimonial">Testimonial</Link></li>
              <li><Link href="/#">Wow we work</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3 text-xl">Support</h3>
            <ul className="space-y-2 text-lg ">
              <li><Link href="#">Contact Us</Link></li>
              <li><Link href="/terms-condition">Terms and Conditions</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/faqs">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-xl">Contact</h3>
            <ul className="space-y-2 text-lg ">
              <li><p className="flex items-center gap-3"><span><IoIosCall size={20} color="var(--color-primary)"/></span> +62 812-3456-7890</p></li>              

              <li><p className="flex items-center gap-3"><span><MdEmail size={20} color="var(--color-primary)"/></span> Support@Dailybuzz.com</p></li>              
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-lg ">
          <p>© {new Date().getFullYear()} Artify. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="border-r-2 pr-3">Terms of Use</span>
            <span>Policy</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
